import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        email: string;
        name: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        barber: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bio: string | null;
            specialty: string | null;
            imageUrl: string | null;
            userId: string;
        } | null;
        email: string;
        name: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, data: {
        name?: string;
        phone?: string;
    }): Promise<{
        email: string;
        name: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        id: string;
    }>;
}
