import { IsNotEmpty, IsString, IsDateString, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { SlotStatus } from '@prisma/client';

export class CreateScheduleDto {
  @IsDateString()
  date!: string;

  @IsString()
  @IsNotEmpty()
  startTime!: string; // "09:00"

  @IsString()
  @IsNotEmpty()
  endTime!: string; // "10:00"
}

export class BulkCreateScheduleDto {
  @IsDateString()
  date!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  slots!: TimeSlotDto[];
}

export class TimeSlotDto {
  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  endTime!: string;
}

export class UpdateScheduleDto {
  @IsOptional()
  @IsEnum(SlotStatus)
  status?: SlotStatus;
}
