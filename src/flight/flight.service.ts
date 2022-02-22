import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { PrismaService } from 'src/prisma.service';
import { Flight } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FlightService {

  constructor(private prismaService: PrismaService) {}

  async create(createFlightDto: CreateFlightDto, userID: string): Promise<Flight> {

    const createdFlight = await this.prismaService.flight.create({
      data: {
        departure: createFlightDto.departure,
        arrival: createFlightDto.arrival,
        price: createFlightDto.price,
        availableSeats: createFlightDto.availableSeats,
        User: {
          connect: {
            ID: userID, 
          },
        },
      },
    });
    return createdFlight;
  }

  async findAll(): Promise<Flight[]> {
    const flights = await this.prismaService.flight.findMany();
    return flights;
  }

  async findOne(ID: string): Promise<Flight> {
    const found = await this.prismaService.flight.findUnique({
      where: {
        ID: ID,
      },
    });
    if (!found) {
      throw new NotFoundException('Vôo não encontrado');
    }
    return found;
  }

  async update(ID: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const foundFlight = await this.prismaService.flight.findUnique({
      where: {
        ID: ID,
      },
    });

    if (!foundFlight) {
      throw new NotFoundException('Vôo não encontrado');
    }

    const updatedFlight = await this.prismaService.flight.update({
      where: {ID: ID},
      data: {
        departure: updateFlightDto.departure,
        arrival: updateFlightDto.arrival,
        price: updateFlightDto.price,
        availableSeats: updateFlightDto.availableSeats,
      },
    });
    return updatedFlight;
  }

  async remove(ID: string) {
    const foundFlight = await this.prismaService.flight.findUnique({
      where: {
        ID: ID,
      },
    });

    if (!foundFlight) {
      throw new NotFoundException('Vôo não encontrado');
    }

    const removedFlight = await this.prismaService.flight.delete({
      where: {
        ID: ID,
      },
    });
    return removedFlight;
  }
}
