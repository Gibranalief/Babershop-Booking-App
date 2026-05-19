import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';

@Injectable()
export class BarbersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.barber.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        services: true,
        _count: { select: { bookings: true } },
      },
    });
  }

  async findOne(id: string) {
    const barber = await this.prisma.barber.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        services: true,
        schedules: {
          where: { date: { gte: new Date() } },
          orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
        },
      },
    });

    if (!barber) {
      throw new NotFoundException('Barber not found');
    }

    return barber;
  }

  async create(userId: string, dto: CreateBarberDto) {
    // Check if barber profile already exists for this user
    const existing = await this.prisma.barber.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new ForbiddenException('Barber profile already exists');
    }

    return this.prisma.barber.create({
      data: {
        userId,
        bio: dto.bio,
        specialty: dto.specialty,
        imageUrl: dto.imageUrl,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateBarberDto) {
    const barber = await this.prisma.barber.findUnique({ where: { id } });

    if (!barber) {
      throw new NotFoundException('Barber not found');
    }

    if (barber.userId !== userId) {
      throw new ForbiddenException('You can only update your own profile');
    }

    return this.prisma.barber.update({
      where: { id },
      data: dto,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.barber.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        services: true,
      },
    });
  }
}
