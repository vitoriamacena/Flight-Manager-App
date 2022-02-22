import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';
import { Booking } from '@prisma/client';
import { ResponseCreateBookingDto } from './dto/response-create-booking.dto';
import { User } from '@prisma/client';

@Injectable()
export class BookingService {

  constructor(private prismaService: PrismaService) {}

  async create(user: User, createBookingDto: CreateBookingDto) {

    const seatTaken = await this.prismaService.booking.findFirst({
      where: { seats: createBookingDto.seat },
    });

    if (seatTaken) {
      throw new ConflictException('Assento já reservado. Por favor, escolha outro.');
    }

    const bookingInfo = await this.prismaService.flight.findUnique({
      where: {
        ID: createBookingDto.ticketNumber,
      },
    });

    if (!bookingInfo) {
      throw new NotFoundException('Vôo não emcontrado');
    }

    const date = await this.prismaService.booking.findMany({
      where: {
        ID: bookingInfo.ID,
      },
    });

    const createdBooking = await this.prismaService.booking.create({
      data: {
        flightDate: createBookingDto.flightDate,
        seats: createBookingDto.seat,
        ticketNumber: createBookingDto.ticketNumber,
        User: {
          connect: {
            ID: user.ID,
          },
        },
        Flight: {
          connect: {
            ID: createBookingDto.ticketNumber,
          },
        },
        addOns: {
          connect: createBookingDto.addOns.map((item) => ({ID: item})),
        },
      },
    });
    const responseCreateBookingDto: ResponseCreateBookingDto = {
      flightID: createdBooking.ID ,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      flightDate: createdBooking.flightDate,
      flightDeparture: bookingInfo.departure,
      flightArrival: bookingInfo.arrival,
      flightPrice: bookingInfo.price,
      seat: createdBooking.seats,
      addOns: createBookingDto.addOns,
    }
    return { responseCreateBookingDto } ;
  }

  async findAll(): Promise<Booking[]> {
    const reservations = await this.prismaService.booking.findMany();
    return reservations;
  }

  async findOne(ID: string): Promise<Booking> {
    const found = await this.prismaService.booking.findUnique({
      where: {
        ID: ID,
      },
    });
    if (!found) {
      throw new NotFoundException('Reserva não encontrada');
    }
    return found;
  }

  async update(bookingID: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const foundReservation = await this.prismaService.booking.findUnique({
      where: {
        ID: bookingID,
      },
    });

    if (!foundReservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    const updateBooking = await this.prismaService.booking.update({
      where: {ID: bookingID},
      data: {
        flightDate: updateBookingDto.flightDate,
        ticketNumber: updateBookingDto.ticketNumber,
        seats: updateBookingDto.seat,
      },
    });
    return updateBooking;
  }

  async remove(bookingID: string) {
    const foundReservation = await this.prismaService.booking.findUnique({
      where: {
        ID: bookingID,
      },
    });

    if (!foundReservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    const removedBooking = await this.prismaService.booking.delete({
      where: {
        ID: bookingID,
      },
    });
    return removedBooking;
  }

}
