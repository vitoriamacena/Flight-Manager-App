import { IsNumber, IsString, IsDateString, IsEmail, IsNotEmpty, IsArray } from "class-validator";

export class ResponseCreateBookingDto {

    @IsString()
    @IsNotEmpty()
    flightID: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;

    @IsString()
    @IsNotEmpty()
    flightDeparture: string;

    @IsString()
    @IsNotEmpty()
    flightArrival: string;

    @IsDateString()
    @IsString()
    @IsNotEmpty()
    flightDate: Date;

    @IsNumber()
    @IsNotEmpty()
    flightPrice: Number;

    @IsString()
    @IsNotEmpty()
    seat: string;

    @IsArray()
    @IsNotEmpty()
    addOns: number[];
}