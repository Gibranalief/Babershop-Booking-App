"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarbersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BarbersService = class BarbersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.barber.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                services: true,
                _count: { select: { bookings: true } },
            },
        });
    }
    async findOne(id) {
        const barber = await this.prisma.barber.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, name: true, email: true, phone: true },
                },
                services: true,
                schedules: {
                    where: { date: { gte: new Date() } },
                    orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
                },
            },
        });
        if (!barber) {
            throw new common_1.NotFoundException('Barber not found');
        }
        return barber;
    }
    async create(userId, dto) {
        const existing = await this.prisma.barber.findUnique({
            where: { userId },
        });
        if (existing) {
            throw new common_1.ForbiddenException('Barber profile already exists');
        }
        return this.prisma.barber.create({
            data: {
                userId,
                bio: dto.bio,
                specialty: dto.specialty,
                imageUrl: dto.imageUrl,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
    }
    async update(id, userId, dto) {
        const barber = await this.prisma.barber.findUnique({ where: { id } });
        if (!barber) {
            throw new common_1.NotFoundException('Barber not found');
        }
        if (barber.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own profile');
        }
        return this.prisma.barber.update({
            where: { id },
            data: dto,
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
    }
    async findByUserId(userId) {
        return this.prisma.barber.findUnique({
            where: { userId },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
                services: true,
            },
        });
    }
};
exports.BarbersService = BarbersService;
exports.BarbersService = BarbersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BarbersService);
//# sourceMappingURL=barbers.service.js.map