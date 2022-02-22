import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsNotEmpty, IsArray } from "class-validator";

export class CreateBookingDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    flightDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    ticketNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    seat: string;
    
    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    addOns: number[];
}
