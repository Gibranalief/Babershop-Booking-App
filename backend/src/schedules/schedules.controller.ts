import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import {
  CreateScheduleDto,
  BulkCreateScheduleDto,
  UpdateScheduleDto,
} from './dto/create-schedule.dto';
import { Role } from '@prisma/client';

@Controller('api/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get('barber/:barberId')
  findByBarber(
    @Param('barberId') barberId: string,
    @Query('date') date?: string,
  ) {
    return this.schedulesService.findByBarber(barberId, date);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BARBER)
  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: CreateScheduleDto) {
    return this.schedulesService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BARBER)
  @Post('bulk')
  bulkCreate(
    @CurrentUser('id') userId: string,
    @Body() dto: BulkCreateScheduleDto,
  ) {
    return this.schedulesService.bulkCreate(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BARBER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(id, userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BARBER)
  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.schedulesService.delete(id, userId);
  }
}
