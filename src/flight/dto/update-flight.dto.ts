import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';
import { 
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional
} from "class-validator";

export class UpdateFlightDto extends PartialType(CreateFlightDto) {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    departure: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    arrival: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    availableSeats: number;
}
