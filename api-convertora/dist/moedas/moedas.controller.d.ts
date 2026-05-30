import { MoedasService } from './moedas.service';
import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
export declare class MoedasController {
    private readonly moedasService;
    constructor(moedasService: MoedasService);
    create(createMoedaDto: CreateMoedaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMoedaDto: UpdateMoedaDto): string;
    remove(id: string): string;
}
