import { PrismaService } from '../prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getNextHourSlots;
    create(userId: string, dto: any): Promise<{
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
        schedules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
            bookingId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
        serviceId: string;
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
        schedules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
            bookingId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
        serviceId: string;
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
        schedules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
            bookingId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
        serviceId: string;
    })[]>;
    updateStatus(id: string, userId: string, dto: any): Promise<{
        service: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        };
        schedules: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: string;
            date: Date;
            barberId: string;
            endTime: string;
            status: import(".prisma/client").$Enums.SlotStatus;
            bookingId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
        serviceId: string;
    }>;
    cancel(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
        notes: string | null;
        serviceId: string;
    }>;
}
