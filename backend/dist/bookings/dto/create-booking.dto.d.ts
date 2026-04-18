import { BookingStatus } from '@prisma/client';
export declare class CreateBookingDto {
    barberId: string;
    serviceId: string;
    scheduleId: string;
    notes?: string;
}
export declare class UpdateBookingStatusDto {
    status: BookingStatus;
}
