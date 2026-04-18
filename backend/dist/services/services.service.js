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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServicesService = class ServicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByBarber(barberId) {
        return this.prisma.service.findMany({
            where: { barberId },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const service = await this.prisma.service.findUnique({
            where: { id },
            include: { barber: { include: { user: { select: { name: true } } } } },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return service;
    }
    async create(userId, dto) {
        const barber = await this.prisma.barber.findUnique({
            where: { userId },
        });
        if (!barber) {
            throw new common_1.ForbiddenException('Barber profile not found');
        }
        return this.prisma.service.create({
            data: {
                barberId: barber.id,
                name: dto.name,
                duration: dto.duration,
                price: dto.price,
            },
        });
    }
    async update(id, userId, dto) {
        const service = await this.prisma.service.findUnique({
            where: { id },
            include: { barber: true },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        if (service.barber.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own services');
        }
        return this.prisma.service.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id, userId) {
        const service = await this.prisma.service.findUnique({
            where: { id },
            include: { barber: true },
        });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        if (service.barber.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own services');
        }
        return this.prisma.service.delete({ where: { id } });
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map