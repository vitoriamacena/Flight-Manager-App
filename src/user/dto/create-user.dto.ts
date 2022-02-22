import { 
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsUrl
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    passwordValidation: string;

    @IsNotEmpty()
    @IsUrl()
    @ApiProperty()
    imageUrl: string;
}
