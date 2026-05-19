import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findByBarber(barberId: string) {
    return this.prisma.service.findMany({
      where: { barberId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { barber: { include: { user: { select: { name: true } } } } },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async create(userId: string, dto: CreateServiceDto) {
    const barber = await this.prisma.barber.findUnique({
      where: { userId },
    });

    if (!barber) {
      throw new ForbiddenException('Barber profile not found');
    }

    return this.prisma.service.create({
      data: {
        barberId: barber.id,
        name: dto.name,
        duration: dto.duration,
        price: dto.price,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateServiceDto) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { barber: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.barber.userId !== userId) {
      throw new ForbiddenException('You can only update your own services');
    }

    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, userId: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { barber: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.barber.userId !== userId) {
      throw new ForbiddenException('You can only delete your own services');
    }

    return this.prisma.service.delete({ where: { id } });
  }
}
