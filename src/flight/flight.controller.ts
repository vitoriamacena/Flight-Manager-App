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
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Flight, User } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Flight')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  @ApiOperation({summary:'Cria um novo vôo'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(@Body() 
  createFlightDto: CreateFlightDto, 
  @LoggedUser() user: User): Promise<Flight> {
  return this.flightService.create(createFlightDto, user.ID);
  }

  @ApiOperation({summary:'Lista todos os vôos'})
  @Get()
  findAll(): Promise<Flight[]> {
    return this.flightService.findAll();
  }

  @Get(':ID')
  @ApiOperation({summary:'Lista um vôo pelo seu id'})
  findOne(@Param('ID') ID: string) {
    return this.flightService.findOne(ID);
  }

  @Patch()
  @ApiOperation({summary:'Atualiza um vôo pelo seu id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@LoggedUser() user: User, flight: Flight, 
  @Body() updateFlightDto: UpdateFlightDto): Promise<Flight> {
    return this.flightService.update(flight.ID, updateFlightDto);
  }

  @Delete()
  @ApiOperation({summary:'Deleta um vôo pelo seu id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  remove(@LoggedUser() user: User, flight: Flight) {
    return this.flightService.remove(flight.ID);
  }
}
