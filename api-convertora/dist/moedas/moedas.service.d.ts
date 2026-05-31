import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
import { Repository } from 'typeorm';
import { Moeda } from './entities/moeda.entity';
import { CotacaoMoeda } from './entities/cotacao-moeda.entity';
import { ConversaoHistorico } from './entities/conversao-historico.entity';
export declare class MoedasService {
    private moedaRepo;
    private cotacaoRepo;
    private historicoRepo;
    constructor(moedaRepo: Repository<Moeda>, cotacaoRepo: Repository<CotacaoMoeda>, historicoRepo: Repository<ConversaoHistorico>);
    create(dto: CreateMoedaDto): Promise<Moeda>;
    addCotacao(id: number, valor: number): Promise<CotacaoMoeda>;
    findAll(): Promise<Moeda[]>;
    findOne(id: number): Promise<Moeda>;
    update(id: number, dto: UpdateMoedaDto): Promise<Moeda>;
    remove(id: number): Promise<void>;
    converter(from: string, to: string, amount: number): Promise<{
        from: string;
        to: string;
        amount: number;
        resultado: number;
        taxaFrom: number;
        taxaTo: number;
    }>;
    findAllConversoes(): Promise<ConversaoHistorico[]>;
    updateConversao(id: number, payload: Partial<ConversaoHistorico>): Promise<ConversaoHistorico>;
}
