import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateScheduleDto,
  BulkCreateScheduleDto,
  UpdateScheduleDto,
} from './dto/create-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async findByBarber(barberId: string, date?: string) {
    const where: any = { barberId };

    if (date) {
      where.date = new Date(date);
    } else {
      // Default: show future slots
      where.date = { gte: new Date(new Date().toISOString().split('T')[0]) };
    }

    return this.prisma.schedule.findMany({
      where,
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async create(userId: string, dto: CreateScheduleDto) {
    const barber = await this.prisma.barber.findUnique({
      where: { userId },
    });

    if (!barber) {
      throw new ForbiddenException('Barber profile not found');
    }

    return this.prisma.schedule.create({
      data: {
        barberId: barber.id,
        date: new Date(dto.date),
        startTime: dto.startTime,
        endTime: dto.endTime,
        status: 'AVAILABLE',
      },
    });
  }

  async bulkCreate(userId: string, dto: BulkCreateScheduleDto) {
    const barber = await this.prisma.barber.findUnique({
      where: { userId },
    });

    if (!barber) {
      throw new ForbiddenException('Barber profile not found');
    }

    const data = dto.slots.map((slot) => ({
      barberId: barber.id,
      date: new Date(dto.date),
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: 'AVAILABLE' as const,
    }));

    // Use skipDuplicates so existing slots are not overwritten
    const result = await this.prisma.schedule.createMany({
      data,
      skipDuplicates: true,
    });

    return { created: result.count, total: dto.slots.length };
  }

  async update(id: string, userId: string, dto: UpdateScheduleDto) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: { barber: true },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule slot not found');
    }

    if (schedule.barber.userId !== userId) {
      throw new ForbiddenException('You can only update your own schedule');
    }

    // Cannot change status of a BOOKED slot to anything except through booking cancellation
    if (schedule.status === 'BOOKED' && dto.status !== 'BOOKED') {
      throw new BadRequestException(
        'Cannot directly change a booked slot. Cancel the booking instead.',
      );
    }

    return this.prisma.schedule.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, userId: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: { barber: true },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule slot not found');
    }

    if (schedule.barber.userId !== userId) {
      throw new ForbiddenException('You can only delete your own schedule');
    }

    if (schedule.status === 'BOOKED') {
      throw new BadRequestException(
        'Cannot delete a booked slot. Cancel the booking first.',
      );
    }

    return this.prisma.schedule.delete({ where: { id } });
  }
}
