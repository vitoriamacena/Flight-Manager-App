import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddonDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}
