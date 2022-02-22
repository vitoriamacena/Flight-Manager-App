import { User } from "@prisma/client";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginResponseDto {

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    user: User;
}