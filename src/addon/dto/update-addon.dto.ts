import { PartialType } from '@nestjs/swagger';
import { CreateAddonDto } from './create-addon.dto';
import { 
    IsString,
    IsNotEmpty,
} from "class-validator";

export class UpdateAddonDto extends PartialType(CreateAddonDto) {

    @IsString()
    @IsNotEmpty()
    name: string;
}
