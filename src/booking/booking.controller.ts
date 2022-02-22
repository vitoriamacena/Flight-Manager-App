import {
  Controller,
  Get, 
  Post,
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
   } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User, Booking } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria uma reserva'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(@LoggedUser() user: User, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(user , createBookingDto);
  }

  @Get()
  @ApiOperation({summary:'Lista todas as reservas'})
  findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':ID')
  @ApiOperation({summary:'Lista uma reserva pelo seu id'})
  findOne(@Param('ID') bookingID: string): Promise<Booking> {
    return this.bookingService.findOne(bookingID);
  }

  @Patch()
  @ApiOperation({summary:'Atualiza uma reserva pelo seu id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@LoggedUser() user: User, booking: Booking,
  @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
    return this.bookingService.update(booking.ID, updateBookingDto);
  }

  @Delete()
  @ApiOperation({summary:'Deleta uma reserva pelo seu id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  remove(@LoggedUser() user: User, booking: Booking) {
    return this.bookingService.remove(booking.ID);
  }

}