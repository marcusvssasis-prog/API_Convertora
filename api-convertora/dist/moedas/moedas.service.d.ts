import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
export declare class MoedasService {
    create(createMoedaDto: CreateMoedaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMoedaDto: UpdateMoedaDto): string;
    remove(id: number): string;
}
