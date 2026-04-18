import { BarbersService } from './barbers.service';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
export declare class BarbersController {
    private readonly barbersService;
    constructor(barbersService: BarbersService);
    findAll(): Promise<({
        user: {
            email: string;
            name: string;
            id: string;
        };
        services: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        }[];
        _count: {
            bookings: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialty: string | null;
        imageUrl: string | null;
        userId: string;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            email: string;
            name: string;
            phone: string | null;
            id: string;
        };
        services: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        }[];
        schedules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialty: string | null;
        imageUrl: string | null;
        userId: string;
    }>;
    create(userId: string, dto: CreateBarberDto): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialty: string | null;
        imageUrl: string | null;
        userId: string;
    }>;
    update(id: string, userId: string, dto: UpdateBarberDto): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialty: string | null;
        imageUrl: string | null;
        userId: string;
    }>;
    getMyProfile(userId: string): Promise<({
        user: {
            email: string;
            name: string;
            id: string;
        };
        services: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bio: string | null;
        specialty: string | null;
        imageUrl: string | null;
        userId: string;
    }) | null>;
}
