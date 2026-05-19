import { PrismaService } from '../prisma/prisma.service';
<<<<<<< HEAD
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getNextHourSlots;
    create(userId: string, dto: any): Promise<{
=======
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateBookingDto): Promise<{
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
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
<<<<<<< HEAD
        schedules: {
=======
        schedule: {
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
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
        }[];
=======
        };
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
<<<<<<< HEAD
        notes: string | null;
        serviceId: string;
=======
        serviceId: string;
        scheduleId: string;
        notes: string | null;
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
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
<<<<<<< HEAD
        schedules: {
=======
        schedule: {
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
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
        }[];
=======
        };
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
<<<<<<< HEAD
        notes: string | null;
        serviceId: string;
=======
        serviceId: string;
        scheduleId: string;
        notes: string | null;
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
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
<<<<<<< HEAD
        schedules: {
=======
        schedule: {
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
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
        }[];
=======
        };
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
<<<<<<< HEAD
        notes: string | null;
        serviceId: string;
    })[]>;
    updateStatus(id: string, userId: string, dto: any): Promise<{
=======
        serviceId: string;
        scheduleId: string;
        notes: string | null;
    })[]>;
    updateStatus(id: string, userId: string, dto: UpdateBookingStatusDto): Promise<{
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
        service: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            duration: number;
            price: number;
            barberId: string;
        };
<<<<<<< HEAD
        schedules: {
=======
        schedule: {
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
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
        }[];
=======
        };
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
<<<<<<< HEAD
        notes: string | null;
        serviceId: string;
=======
        serviceId: string;
        scheduleId: string;
        notes: string | null;
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    }>;
    cancel(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        barberId: string;
        status: import(".prisma/client").$Enums.BookingStatus;
<<<<<<< HEAD
        notes: string | null;
        serviceId: string;
=======
        serviceId: string;
        scheduleId: string;
        notes: string | null;
>>>>>>> 25d74ad2db122edfaa8f4eb40aa075a3922a41c0
    }>;
}
