import { MoedasService } from './moedas.service';
import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
export declare class MoedasController {
    private readonly moedasService;
    constructor(moedasService: MoedasService);
    create(createMoedaDto: CreateMoedaDto): Promise<import("./entities/moeda.entity").Moeda>;
    addCotacao(id: string, valor: number): Promise<import("./entities/cotacao-moeda.entity").CotacaoMoeda>;
    findAll(): Promise<import("./entities/moeda.entity").Moeda[]>;
    findOne(id: string): Promise<import("./entities/moeda.entity").Moeda>;
    update(id: string, updateMoedaDto: UpdateMoedaDto): Promise<import("./entities/moeda.entity").Moeda>;
    remove(id: string): Promise<void>;
}
