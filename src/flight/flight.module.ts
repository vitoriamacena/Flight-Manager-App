import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [FlightController],
  providers: [FlightService, PrismaService],
})
export class FlightModule {}
