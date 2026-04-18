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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SchedulesService = class SchedulesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByBarber(barberId, date) {
        const where = { barberId };
        if (date) {
            where.date = new Date(date);
        }
        else {
            where.date = { gte: new Date(new Date().toISOString().split('T')[0]) };
        }
        return this.prisma.schedule.findMany({
            where,
            orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
        });
    }
    async create(userId, dto) {
        const barber = await this.prisma.barber.findUnique({
            where: { userId },
        });
        if (!barber) {
            throw new common_1.ForbiddenException('Barber profile not found');
        }
        return this.prisma.schedule.create({
            data: {
                barberId: barber.id,
                date: new Date(dto.date),
                startTime: dto.startTime,
                endTime: dto.endTime,
                status: 'AVAILABLE',
            },
        });
    }
    async bulkCreate(userId, dto) {
        const barber = await this.prisma.barber.findUnique({
            where: { userId },
        });
        if (!barber) {
            throw new common_1.ForbiddenException('Barber profile not found');
        }
        const data = dto.slots.map((slot) => ({
            barberId: barber.id,
            date: new Date(dto.date),
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: 'AVAILABLE',
        }));
        const result = await this.prisma.schedule.createMany({
            data,
            skipDuplicates: true,
        });
        return { created: result.count, total: dto.slots.length };
    }
    async update(id, userId, dto) {
        const schedule = await this.prisma.schedule.findUnique({
            where: { id },
            include: { barber: true },
        });
        if (!schedule) {
            throw new common_1.NotFoundException('Schedule slot not found');
        }
        if (schedule.barber.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own schedule');
        }
        if (schedule.status === 'BOOKED' && dto.status !== 'BOOKED') {
            throw new common_1.BadRequestException('Cannot directly change a booked slot. Cancel the booking instead.');
        }
        return this.prisma.schedule.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id, userId) {
        const schedule = await this.prisma.schedule.findUnique({
            where: { id },
            include: { barber: true },
        });
        if (!schedule) {
            throw new common_1.NotFoundException('Schedule slot not found');
        }
        if (schedule.barber.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own schedule');
        }
        if (schedule.status === 'BOOKED') {
            throw new common_1.BadRequestException('Cannot delete a booked slot. Cancel the booking first.');
        }
        return this.prisma.schedule.delete({ where: { id } });
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map