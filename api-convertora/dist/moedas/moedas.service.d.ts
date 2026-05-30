import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
import { Repository } from "typeorm";
import { Moeda } from './entities/moeda.entity';
import { CotacaoMoeda } from './entities/cotacao-moeda.entity';
export declare class MoedasService {
    private moedaRepo;
    private cotacaoRepo;
    constructor(moedaRepo: Repository<Moeda>, cotacaoRepo: Repository<CotacaoMoeda>);
    create(dto: CreateMoedaDto): Promise<Moeda>;
    addCotacao(id: number, valor: number): Promise<CotacaoMoeda>;
    findAll(): Promise<Moeda[]>;
    findOne(id: number): Promise<Moeda>;
    update(id: number, dto: UpdateMoedaDto): Promise<Moeda>;
    remove(id: number): Promise<void>;
}
