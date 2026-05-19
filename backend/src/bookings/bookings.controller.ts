import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Roles(Role.CUSTOMER)
  @UseGuards(RolesGuard)
  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(userId, dto);
  }

  @Get('my')
  findMyBookings(@CurrentUser('id') userId: string) {
    return this.bookingsService.findMyBookings(userId);
  }

  @Roles(Role.BARBER)
  @UseGuards(RolesGuard)
  @Get('barber')
  findBarberBookings(@CurrentUser('id') userId: string) {
    return this.bookingsService.findBarberBookings(userId);
  }

  @Roles(Role.BARBER)
  @UseGuards(RolesGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(id, userId, dto);
  }

  @Delete(':id')
  cancel(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.bookingsService.cancel(id, userId);
  }
}
