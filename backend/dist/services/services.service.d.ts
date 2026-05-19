import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    findByBarber(barberId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        duration: number;
        price: number;
        barberId: string;
    }[]>;
    findOne(id: string): Promise<{
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
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        duration: number;
        price: number;
        barberId: string;
    }>;
    create(userId: string, dto: CreateServiceDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        duration: number;
        price: number;
        barberId: string;
    }>;
    update(id: string, userId: string, dto: UpdateServiceDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        duration: number;
        price: number;
        barberId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        duration: number;
        price: number;
        barberId: string;
    }>;
}
