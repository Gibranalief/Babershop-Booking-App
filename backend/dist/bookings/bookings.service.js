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
    getNextHourSlots(startTime, durationMinutes) {
        const slotsNeeded = Math.ceil(durationMinutes / 60);
        const slots = [];
        let [hours, minutes] = startTime.split(':').map(Number);
        for (let i = 0; i < slotsNeeded; i++) {
            const slotHour = (hours + i).toString().padStart(2, '0');
            const slotMinute = minutes.toString().padStart(2, '0');
            slots.push(`${slotHour}:${slotMinute}`);
        }
        return slots;
    }
    async create(userId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const initialSchedule = await tx.schedule.findUnique({
                where: { id: dto.scheduleId },
            });
            if (!initialSchedule) {
                throw new common_1.NotFoundException('Initial schedule slot not found');
            }
            const service = await tx.service.findFirst({
                where: { id: dto.serviceId, barberId: dto.barberId },
            });
            if (!service) {
                throw new common_1.NotFoundException('Service not found for this barber');
            }
            const requiredSlotTimes = this.getNextHourSlots(initialSchedule.startTime, service.duration);
            const requiredSlots = await tx.schedule.findMany({
                where: {
                    barberId: dto.barberId,
                    date: initialSchedule.date,
                    startTime: { in: requiredSlotTimes },
                },
            });
            if (requiredSlots.length !== requiredSlotTimes.length) {
                throw new common_1.ConflictException('Not enough consecutive slots available for this service duration.');
            }
            const allAvailable = requiredSlots.every((slot) => slot.status === 'AVAILABLE');
            if (!allAvailable) {
                throw new common_1.ConflictException('One or more required time slots have already been booked.');
            }
            await tx.schedule.updateMany({
                where: { id: { in: requiredSlots.map((s) => s.id) } },
                data: { status: 'BOOKED' },
            });
            const booking = await tx.booking.create({
                data: {
                    userId,
                    barberId: dto.barberId,
                    serviceId: dto.serviceId,
                    notes: dto.notes,
                    status: 'PENDING',
                    schedules: {
                        connect: requiredSlots.map((slot) => ({ id: slot.id })),
                    },
                },
                include: {
                    service: true,
                    schedules: true,
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
                schedules: {
                    orderBy: { startTime: 'asc' },
                },
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
                schedules: {
                    orderBy: { startTime: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, userId, dto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { barber: true, schedules: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.barber.userId !== userId) {
            throw new common_1.ForbiddenException('You can only manage your own bookings');
        }
        if (dto.status === 'CANCELLED') {
            await this.prisma.schedule.updateMany({
                where: { id: { in: booking.schedules.map((s) => s.id) } },
                data: { status: 'AVAILABLE' },
            });
        }
        return this.prisma.booking.update({
            where: { id },
            data: { status: dto.status },
            include: {
                service: true,
                schedules: true,
            },
        });
    }
    async cancel(id, userId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { schedules: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('You can only cancel your own bookings');
        }
        await this.prisma.schedule.updateMany({
            where: { id: { in: booking.schedules.map((s) => s.id) } },
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