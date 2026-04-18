import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateBookingDto): Promise<{
        barber: {
            user: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bio: string | null;
            specialty: string | null;
            imageUrl: string | null;
            userId: string;
        };
        service: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        };
        schedule: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        serviceId: string;
        scheduleId: string;
        notes: string | null;
    }>;
    findMyBookings(userId: string): Promise<({
        barber: {
            user: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bio: string | null;
            specialty: string | null;
            imageUrl: string | null;
            userId: string;
        };
        service: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        };
        schedule: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        serviceId: string;
        scheduleId: string;
        notes: string | null;
    })[]>;
    findBarberBookings(userId: string): Promise<({
        user: {
            email: string;
            name: string;
            phone: string | null;
            id: string;
        };
        service: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        };
        schedule: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        serviceId: string;
        scheduleId: string;
        notes: string | null;
    })[]>;
    updateStatus(id: string, userId: string, dto: UpdateBookingStatusDto): Promise<{
        service: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        };
        schedule: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        serviceId: string;
        scheduleId: string;
        notes: string | null;
    }>;
    cancel(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        serviceId: string;
        scheduleId: string;
        notes: string | null;
    }>;
}
