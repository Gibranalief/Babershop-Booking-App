import { SchedulesService } from './schedules.service';
import { CreateScheduleDto, BulkCreateScheduleDto, UpdateScheduleDto } from './dto/create-schedule.dto';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    findByBarber(barberId: string, date?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: string;
        date: Date;
        barberId: string;
        endTime: string;
        status: import(".prisma/client").$Enums.SlotStatus;
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
    }>;
}
