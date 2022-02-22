import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { 
    IsString,
    IsEmail,
    IsNotEmpty,
    IsUrl,
    IsOptional
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsOptional()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsOptional()
    @IsUrl()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    imageUrl: string;
}
