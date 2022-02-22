import {
Controller,
Get, 
Post,
Body, 
Patch, 
Param, 
Delete, 
UseGuards,
 } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({summary:'Cria um usuário'})
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary:'Lista todos os usuários'})
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':ID')
  @ApiOperation({summary:'Lista um usuário pelo seu id'})
  findOne(@Param('ID') userID: string): Promise<User> {
    return this.userService.findOne(userID);
  }

  @Patch()
  @ApiOperation({summary:'Atualiza um usuário pelo seu id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@LoggedUser() user: User, 
  @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(user.ID, updateUserDto);
  }

  @Delete()
  @ApiOperation({summary:'Deleta um usuário pelo seu id'})
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  remove(@LoggedUser() user: User) {
    return this.userService.remove(user.ID);
  }
}
