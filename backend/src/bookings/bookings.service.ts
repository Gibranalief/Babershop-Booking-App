import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

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
        const service = await tx.service.findFirst({
          where: { id: dto.serviceId, barberId: dto.barberId },
        });

        if (!service) {
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
        const booking = await tx.booking.create({
          data: {
            userId,
            barberId: dto.barberId,
            serviceId: dto.serviceId,
            scheduleId: dto.scheduleId,
            notes: dto.notes,
            status: 'PENDING',
          },
          include: {
            service: true,
            schedule: true,
            barber: {
              include: { user: { select: { name: true } } },
            },
          },
        });

        return booking;
      },
      {
        // Serializable isolation prevents phantom reads / race conditions
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,
        timeout: 10000,
      },
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GET MY BOOKINGS (for Customer)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async findMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        service: true,
        schedule: true,
        barber: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GET BARBER'S BOOKINGS (for Barber dashboard)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
        schedule: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // UPDATE BOOKING STATUS (Barber only)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async updateStatus(id: string, userId: string, dto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { barber: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.barber.userId !== userId) {
      throw new ForbiddenException('You can only manage your own bookings');
    }

    // If cancelling, free up the schedule slot
    if (dto.status === 'CANCELLED') {
      await this.prisma.schedule.update({
        where: { id: booking.scheduleId },
        data: { status: 'AVAILABLE' },
      });
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
      include: {
        service: true,
        schedule: true,
      },
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CANCEL BOOKING (Customer can cancel their own)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only cancel your own bookings');
    }

    // Free up the schedule slot
    await this.prisma.schedule.update({
      where: { id: booking.scheduleId },
      data: { status: 'AVAILABLE' },
    });

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
}
