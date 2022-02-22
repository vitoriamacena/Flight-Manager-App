import { NotFoundException, ConflictException, Injectable } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { PrismaService } from 'src/prisma.service';
import { AddOn } from '@prisma/client';

@Injectable()
export class AddonService {

  constructor(private prismaService: PrismaService) {}

  async create(createAddonDto: CreateAddonDto) {
    const addOnExists = this.prismaService.addOn.findFirst({
      where: { name: createAddonDto.name },
    });

    if (addOnExists) {
      new ConflictException(`Opção já cadastrada.`)
    }

    const createdAddon = await this.prismaService.addOn.create({
    data: createAddonDto,
    });

    return createdAddon;
  }

  async findAll(): Promise<AddOn[]> {
    const addons = await this.prismaService.addOn.findMany();
    return addons;
  }

  async findOne(ID: number): Promise<AddOn> {
    const found = await this.prismaService.addOn.findUnique({
      where: {
        ID: ID,
      },
    });
    if (!found) {
      throw new NotFoundException('Adicionais não encontrados');
    }
    return found;
  }

  async update(addonID: number, updateAddonDto: UpdateAddonDto): Promise<AddOn> {
    const addons = await this.prismaService.addOn.findUnique({
      where: {
        ID: addonID,
      },
    });

    if (!addons) {
      throw new NotFoundException('Adicionais não encontrados');
    }

    const updatedAddon = await this.prismaService.addOn.update({
      where: {ID: addonID},
      data: {
        name: updateAddonDto.name,
      },
    });
    return updatedAddon;
  }

  async remove(addonID: number) {
    const addons = await this.prismaService.addOn.findUnique({
      where: {
        ID: addonID,
      },
    });

    if (!addons) {
      throw new NotFoundException('Adicionais não encontrados');
    }

    const removedAddon = await this.prismaService.addOn.delete({
      where: {
        ID: addonID,
      },
    });
    return removedAddon;
  }
}
