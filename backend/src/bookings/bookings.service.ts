import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // Helper to generate the next hour strings (e.g., "09:00" -> "10:00")
  private getNextHourSlots(
    startTime: string,
    durationMinutes: number,
  ): string[] {
    const slotsNeeded = Math.ceil(durationMinutes / 60);
    const slots = [];
    let [hours, minutes] = startTime.split(':').map(Number);

    for (let i = 0; i < slotsNeeded; i++) {
      const slotHour = (hours + i).toString().padStart(2, '0');
      const slotMinute = minutes.toString().padStart(2, '0');
      slots.push(`${slotHour}:${slotMinute}`);
    }
    return slots;
  }

  async create(userId: string, dto: any) {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Find the initial schedule the user clicked to get the date and start time
        const initialSchedule = await tx.schedule.findUnique({
          where: { id: dto.scheduleId },
        });

        if (!initialSchedule) {
          throw new NotFoundException('Initial schedule slot not found');
        }

        // 2. Find the service to get its duration
        const service = await tx.service.findFirst({
          where: { id: dto.serviceId, barberId: dto.barberId },
        });

        if (!service) {
          throw new NotFoundException('Service not found for this barber');
        }

        // 3. Calculate all required slot times based on duration
        const requiredSlotTimes = this.getNextHourSlots(
          initialSchedule.startTime,
          service.duration,
        );

        // 4. Fetch all required slots and lock them for update
        const requiredSlots = await tx.schedule.findMany({
          where: {
            barberId: dto.barberId,
            date: initialSchedule.date,
            startTime: { in: requiredSlotTimes },
          },
        });

        // 5. Validation: Ensure all slots exist and are AVAILABLE
        if (requiredSlots.length !== requiredSlotTimes.length) {
          throw new ConflictException(
            'Not enough consecutive slots available for this service duration.',
          );
        }

        const allAvailable = requiredSlots.every(
          (slot) => slot.status === 'AVAILABLE',
        );
        if (!allAvailable) {
          throw new ConflictException(
            'One or more required time slots have already been booked.',
          );
        }

        // 6. Update all required slots to BOOKED
        await tx.schedule.updateMany({
          where: { id: { in: requiredSlots.map((s) => s.id) } },
          data: { status: 'BOOKED' },
        });

        // 7. Create the booking and connect it to all the slots
        const booking = await tx.booking.create({
          data: {
            userId,
            barberId: dto.barberId,
            serviceId: dto.serviceId,
            notes: dto.notes,
            status: 'PENDING',
            // Connect this booking to multiple schedules
            schedules: {
              connect: requiredSlots.map((slot) => ({ id: slot.id })),
            },
          },
          include: {
            service: true,
            schedules: true,
            barber: {
              include: { user: { select: { name: true } } },
            },
          },
        });

        return booking;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,
        timeout: 10000,
      },
    );
  }

  async findMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        service: true,
        schedules: {
          orderBy: { startTime: 'asc' },
        },
        barber: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBarberBookings(userId: string) {
    const barber = await this.prisma.barber.findUnique({
      where: { userId },
    });
    if (!barber) {
      throw new ForbiddenException('Barber profile not found');
    }
    return this.prisma.booking.findMany({
      where: { barberId: barber.id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        service: true,
        schedules: {
          orderBy: { startTime: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, userId: string, dto: any) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { barber: true, schedules: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.barber.userId !== userId) {
      throw new ForbiddenException('You can only manage your own bookings');
    }

    // If cancelling, free up ALL connected slots
    if (dto.status === 'CANCELLED') {
      await this.prisma.schedule.updateMany({
        where: { id: { in: booking.schedules.map((s) => s.id) } },
        data: { status: 'AVAILABLE' },
      });
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
      include: {
        service: true,
        schedules: true,
      },
    });
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { schedules: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    // Free up ALL connected slots
    await this.prisma.schedule.updateMany({
      where: { id: { in: booking.schedules.map((s) => s.id) } },
      data: { status: 'AVAILABLE' },
    });

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
}
