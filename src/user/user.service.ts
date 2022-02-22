import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEmailExists = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userEmailExists) {
      throw new ConflictException('E-mail já cadastrado');
    }

    if (createUserDto.password !== createUserDto.passwordValidation) {
      throw new ConflictException('Senhas não conferem');
    }
    delete createUserDto.passwordValidation;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    delete createdUser.password;
    return createdUser;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany({
      select: {
        ID: true,
        email: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  async findOne(userID: string): Promise<User> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        ID: userID,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    delete foundUser.password;
    return foundUser;
  }

  async update(userID: string, updateUserDto: UpdateUserDto): Promise<User> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        ID: userID,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updateUserDto.email) {

      const emailExists = await this.prismaService.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    const updatedUser = await this.prismaService.user.update({
      where: {ID: userID},
      data: {
        email: updateUserDto.email,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        imageUrl: updateUserDto.imageUrl,
      },
    });
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(userID: string) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        ID: userID,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const removedUser = await this.prismaService.user.delete({
      where: {
        ID: userID,
      },
    });
    delete removedUser.password;
    return removedUser;
  }

}


