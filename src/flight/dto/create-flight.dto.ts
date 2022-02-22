import { 
    IsString,
    IsNotEmpty,
    IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFlightDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    departure: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    arrival: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    availableSeats: number;

}
