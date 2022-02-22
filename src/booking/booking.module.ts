import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [BookingController],
  providers: [BookingService, PrismaService]
})
export class BookingModule {}
