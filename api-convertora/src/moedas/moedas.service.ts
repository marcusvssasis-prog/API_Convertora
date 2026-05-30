import { Injectable } from '@nestjs/common';
import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';

@Injectable()
export class MoedasService {
  create(createMoedaDto: CreateMoedaDto) {
    return "This action adds a new moeda";
  }

  findAll() {
    return "Todas moedas: \n EUR \n USD \n BRL \n JPY ";
  }
  findOne(id: number) {
    return "This action returns a #${id} moeda";
  }

  update(id: number, updateMoedaDto: UpdateMoedaDto) {
    return "This action updates a #${ id } moeda";
  }

  remove(id: number) {
    return "This action removes a #${id} moeda";
  }
}
