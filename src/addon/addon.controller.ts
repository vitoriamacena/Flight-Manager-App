import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Add-on')
@Controller('addon')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post()
  @ApiOperation({
    summary:'Cria uma opção extra para adicionar ao pacote do vôo' })
  create(@Body() createAddonDto: CreateAddonDto) {
    return this.addonService.create(createAddonDto);
  }

  @Get()
  findAll() {
    return this.addonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddonDto: UpdateAddonDto) {
    return this.addonService.update(+id, updateAddonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addonService.remove(+id);
  }
}
