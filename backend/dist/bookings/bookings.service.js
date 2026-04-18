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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const slots = await tx.$queryRaw(client_1.Prisma.sql `
            SELECT "id", "status", "barberId"
            FROM "schedules"
            WHERE "id" = ${dto.scheduleId}
            FOR UPDATE
          `);
            if (slots.length === 0) {
                throw new common_1.NotFoundException('Schedule slot not found');
            }
            const slot = slots[0];
            if (slot.status !== 'AVAILABLE') {
                throw new common_1.ConflictException('This time slot is no longer available. It may have been booked by another customer.');
            }
            if (slot.barberId !== dto.barberId) {
                throw new common_1.ConflictException('Schedule slot does not belong to the selected barber');
            }
            const service = await tx.service.findFirst({
                where: { id: dto.serviceId, barberId: dto.barberId },
            });
            if (!service) {
                throw new common_1.NotFoundException('Service not found for this barber');
            }
            await tx.schedule.update({
                where: { id: dto.scheduleId },
                data: { status: 'BOOKED' },
            });
            const booking = await tx.booking.create({
                data: {
                    userId,
                    barberId: dto.barberId,
                    serviceId: dto.serviceId,
                    scheduleId: dto.scheduleId,
                    notes: dto.notes,
                    status: 'PENDING',
                },
                include: {
                    service: true,
                    schedule: true,
                    barber: {
                        include: { user: { select: { name: true } } },
                    },
                },
            });
            return booking;
        }, {
            isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable,
            maxWait: 5000,
            timeout: 10000,
        });
    }
    async findMyBookings(userId) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                service: true,
                schedule: true,
                barber: {
                    include: { user: { select: { name: true } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findBarberBookings(userId) {
        const barber = await this.prisma.barber.findUnique({
            where: { userId },
        });
        if (!barber) {
            throw new common_1.ForbiddenException('Barber profile not found');
        }
        return this.prisma.booking.findMany({
            where: { barberId: barber.id },
            include: {
                user: { select: { id: true, name: true, email: true, phone: true } },
                service: true,
                schedule: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, userId, dto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { barber: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.barber.userId !== userId) {
            throw new common_1.ForbiddenException('You can only manage your own bookings');
        }
        if (dto.status === 'CANCELLED') {
            await this.prisma.schedule.update({
                where: { id: booking.scheduleId },
                data: { status: 'AVAILABLE' },
            });
        }
        return this.prisma.booking.update({
            where: { id },
            data: { status: dto.status },
            include: {
                service: true,
                schedule: true,
            },
        });
    }
    async cancel(id, userId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own bookings');
        }
        await this.prisma.schedule.update({
            where: { id: booking.scheduleId },
            data: { status: 'AVAILABLE' },
        });
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map