import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FlightModule } from './flight/flight.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { AddonModule } from './addon/addon.module';

// decorator
@Module({
  imports: [UserModule, FlightModule, BookingModule, AuthModule, AddonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
