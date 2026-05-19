import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
<<<<<<< HEAD
=======
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

<<<<<<< HEAD
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
=======
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CREATE BOOKING — with ANTI-DOUBLE-BOOKING via transaction
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async create(userId: string, dto: CreateBookingDto) {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Lock the schedule row and verify it's AVAILABLE
        const slots = await tx.$queryRaw<
          Array<{ id: string; status: string; barberId: string }>
        >(
          Prisma.sql`
            SELECT "id", "status", "barberId"
            FROM "schedules"
            WHERE "id" = ${dto.scheduleId}
            FOR UPDATE
          `,
        );

        if (slots.length === 0) {
          throw new NotFoundException('Schedule slot not found');
        }

        const slot = slots[0];

        if (slot.status !== 'AVAILABLE') {
          throw new ConflictException(
            'This time slot is no longer available. It may have been booked by another customer.',
          );
        }

        // Verify barberId matches the schedule's barber
        if (slot.barberId !== dto.barberId) {
          throw new ConflictException(
            'Schedule slot does not belong to the selected barber',
          );
        }

        // 2. Verify the service exists and belongs to the barber
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
        const service = await tx.service.findFirst({
          where: { id: dto.serviceId, barberId: dto.barberId },
        });

        if (!service) {
<<<<<<< HEAD
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
=======
          throw new NotFoundException(
            'Service not found for this barber',
          );
        }

        // 3. Mark the slot as BOOKED
        await tx.schedule.update({
          where: { id: dto.scheduleId },
          data: { status: 'BOOKED' },
        });

        // 4. Create the booking record
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
        const booking = await tx.booking.create({
          data: {
            userId,
            barberId: dto.barberId,
            serviceId: dto.serviceId,
<<<<<<< HEAD
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
=======
            scheduleId: dto.scheduleId,
            notes: dto.notes,
            status: 'PENDING',
          },
          include: {
            service: true,
            schedule: true,
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
            barber: {
              include: { user: { select: { name: true } } },
            },
          },
        });

        return booking;
      },
      {
<<<<<<< HEAD
=======
        // Serializable isolation prevents phantom reads / race conditions
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,
        timeout: 10000,
      },
    );
  }

<<<<<<< HEAD
=======
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GET MY BOOKINGS (for Customer)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
  async findMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        service: true,
<<<<<<< HEAD
        schedules: {
          orderBy: { startTime: 'asc' },
        },
=======
        schedule: true,
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
        barber: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

<<<<<<< HEAD
=======
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GET BARBER'S BOOKINGS (for Barber dashboard)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
  async findBarberBookings(userId: string) {
    const barber = await this.prisma.barber.findUnique({
      where: { userId },
    });
<<<<<<< HEAD
    if (!barber) {
      throw new ForbiddenException('Barber profile not found');
    }
=======

    if (!barber) {
      throw new ForbiddenException('Barber profile not found');
    }

>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    return this.prisma.booking.findMany({
      where: { barberId: barber.id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        service: true,
<<<<<<< HEAD
        schedules: {
          orderBy: { startTime: 'asc' },
        },
=======
        schedule: true,
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
      },
      orderBy: { createdAt: 'desc' },
    });
  }

<<<<<<< HEAD
  async updateStatus(id: string, userId: string, dto: any) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { barber: true, schedules: true },
=======
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // UPDATE BOOKING STATUS (Barber only)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async updateStatus(id: string, userId: string, dto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { barber: true },
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
<<<<<<< HEAD
=======

>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    if (booking.barber.userId !== userId) {
      throw new ForbiddenException('You can only manage your own bookings');
    }

<<<<<<< HEAD
    // If cancelling, free up ALL connected slots
    if (dto.status === 'CANCELLED') {
      await this.prisma.schedule.updateMany({
        where: { id: { in: booking.schedules.map((s) => s.id) } },
=======
    // If cancelling, free up the schedule slot
    if (dto.status === 'CANCELLED') {
      await this.prisma.schedule.update({
        where: { id: booking.scheduleId },
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
        data: { status: 'AVAILABLE' },
      });
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
      include: {
        service: true,
<<<<<<< HEAD
        schedules: true,
=======
        schedule: true,
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
      },
    });
  }

<<<<<<< HEAD
  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { schedules: true },
=======
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CANCEL BOOKING (Customer can cancel their own)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
<<<<<<< HEAD
=======

>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

<<<<<<< HEAD
    // Free up ALL connected slots
    await this.prisma.schedule.updateMany({
      where: { id: { in: booking.schedules.map((s) => s.id) } },
=======
    // Free up the schedule slot
    await this.prisma.schedule.update({
      where: { id: booking.scheduleId },
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
      data: { status: 'AVAILABLE' },
    });

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
}
