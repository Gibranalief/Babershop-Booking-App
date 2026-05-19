import { SlotStatus } from '@prisma/client';
export declare class CreateScheduleDto {
    date: string;
    startTime: string;
    endTime: string;
}
export declare class BulkCreateScheduleDto {
    date: string;
    slots: TimeSlotDto[];
}
export declare class TimeSlotDto {
    startTime: string;
    endTime: string;
}
export declare class UpdateScheduleDto {
    status?: SlotStatus;
}
