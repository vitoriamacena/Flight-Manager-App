import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { 
    IsString,
    IsNotEmpty,
    IsArray,
    IsOptional,
    IsDateString
} from "class-validator";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {

    @IsOptional()
    @IsNotEmpty()
    @IsDateString()
    flightDate: Date;

    @IsOptional()
    @IsNotEmpty()
    ticketNumber: string;

    @IsOptional()
    @IsNotEmpty()
    seat: string;
}
