import { MoedasService } from './moedas.service';
import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
import { UpdateCotacaoDto } from './dto/update-cotacao.dto';
export declare class MoedasController {
    private readonly moedasService;
    constructor(moedasService: MoedasService);
    converter(body: {
        from: string;
        to: string;
        amount: number;
    }): Promise<{
        from: string;
        to: string;
        amount: number;
        resultado: number;
        taxaFrom: number;
        taxaTo: number;
        horarioReferencia: string;
    }>;
    create(createMoedaDto: CreateMoedaDto): Promise<import("./entities/moeda.entity").Moeda>;
    addCotacao(id: string, valor: number): Promise<import("./entities/cotacao-moeda.entity").CotacaoMoeda>;
    updateCotacao(id: number, dto: UpdateCotacaoDto): Promise<import("./entities/cotacao-moeda.entity").CotacaoMoeda>;
    findAll(): Promise<import("./entities/moeda.entity").Moeda[]>;
    findOne(id: string): Promise<import("./entities/moeda.entity").Moeda>;
    update(id: string, updateMoedaDto: UpdateMoedaDto): Promise<import("./entities/moeda.entity").Moeda>;
    remove(id: string): Promise<void>;
}
