import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto, BulkCreateScheduleDto, UpdateScheduleDto } from './dto/create-schedule.dto';
export declare class SchedulesService {
    private prisma;
    constructor(prisma: PrismaService);
    findByBarber(barberId: string, date?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        date: Date;
        barberId: string;
        endTime: string;
        status: import(".prisma/client").$Enums.SlotStatus;
<<<<<<< HEAD
        bookingId: string | null;
=======
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    }[]>;
    create(userId: string, dto: CreateScheduleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        date: Date;
        barberId: string;
        endTime: string;
        status: import(".prisma/client").$Enums.SlotStatus;
<<<<<<< HEAD
        bookingId: string | null;
=======
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    }>;
    bulkCreate(userId: string, dto: BulkCreateScheduleDto): Promise<{
        created: number;
        total: number;
    }>;
    update(id: string, userId: string, dto: UpdateScheduleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        date: Date;
        barberId: string;
        endTime: string;
        status: import(".prisma/client").$Enums.SlotStatus;
<<<<<<< HEAD
        bookingId: string | null;
=======
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        date: Date;
        barberId: string;
        endTime: string;
        status: import(".prisma/client").$Enums.SlotStatus;
<<<<<<< HEAD
        bookingId: string | null;
=======
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    }>;
}
