import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoedasService } from './moedas.service';
import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';

@Controller('moedas')
export class MoedasController {
  constructor(private readonly moedasService: MoedasService) {}

  @Post()
  create(@Body() createMoedaDto: CreateMoedaDto) {
    return this.moedasService.create(createMoedaDto);
  }

  @Get()
  findAll() {
    return this.moedasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moedasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoedaDto: UpdateMoedaDto) {
    return this.moedasService.update(+id, updateMoedaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moedasService.remove(+id);
  }
}
