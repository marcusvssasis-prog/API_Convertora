import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moeda } from './entities/moeda.entity';
import { CotacaoMoeda } from './entities/cotacao-moeda.entity';
import { ConversaoHistorico } from './entities/conversao-historico.entity';


@Injectable()
export class MoedasService {
  constructor(
    @InjectRepository(Moeda)
    private moedaRepo: Repository<Moeda>,
    @InjectRepository(CotacaoMoeda)
    private cotacaoRepo: Repository<CotacaoMoeda>,
    @InjectRepository(ConversaoHistorico)
    private historicoRepo: Repository<ConversaoHistorico>,
  ) {}

  // POST /moedas — registra a moeda
  async create(dto: CreateMoedaDto): Promise<Moeda> {
    const moeda = this.moedaRepo.create({ nome: dto.nome });
    return await this.moedaRepo.save(moeda);
  }

  // POST /moedas/:id/cotacao — adiciona valor à moeda
  async addCotacao(id: number, valor: number): Promise<CotacaoMoeda> {
    const moeda = await this.moedaRepo.findOneBy({ id });
    if (!moeda) {
      throw new NotFoundException('Moeda não encontrada');
    }
    return await this.cotacaoRepo.save({ valor, moeda });
  }

  // GET /moedas — lista todas com cotações
  async findAll(): Promise<Moeda[]> {
    return await this.moedaRepo.find({ relations: { cotacoes: true } });
  }

  // GET /moedas/:id — moeda específica com cotações
  async findOne(id: number): Promise<Moeda> {
    const moeda = await this.moedaRepo.findOne({
      where: { id },
      relations: { cotacoes: true },
    });
    if (!moeda) {
      throw new NotFoundException('Moeda não encontrada');
    }
    return moeda;
  }

  async update(id: number, dto: UpdateMoedaDto): Promise<Moeda> {
    await this.moedaRepo.update(id, { nome: dto.nome });
    return await this.findOne(id);
  }

  // DELETE /moedas/:id — remove moeda e cotações
  async remove(id: number): Promise<void> {
    await this.moedaRepo.delete(id);
  }

  async converter(from: string, to: string, amount: number) {
    const moedaFrom = await this.moedaRepo.findOne({
      where: { nome: from },
      relations: { cotacoes: true },
    });
    const moedaTo = await this.moedaRepo.findOne({
      where: { nome: to },
      relations: { cotacoes: true },
    });

    if (!moedaFrom) {
      throw new NotFoundException(`Moeda '${from}' não encontrada`);
    }
    if (!moedaTo) {
      throw new NotFoundException(`Moeda '${to}' não encontrada`);
    }
    if (!moedaFrom.cotacoes?.length) {
      throw new NotFoundException(`Sem cotações para '${from}'`);
    }
    if (!moedaTo.cotacoes?.length) {
      throw new NotFoundException(`Sem cotações para '${to}'`);
    }

    const taxaFrom = moedaFrom.cotacoes
      .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;
    const taxaTo = moedaTo.cotacoes
      .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;

    const resultado = Number((amount * (taxaTo / taxaFrom)).toFixed(6));

    const historico = this.historicoRepo.create({
      moedaFrom: from,
      moedaTo: to,
      amount,
      resultado,
      taxaFrom,
      taxaTo,
    });

    await this.historicoRepo.save(historico);

    return { from, to, amount, resultado, taxaFrom, taxaTo };
  }

  async findAllConversoes(): Promise<ConversaoHistorico[]> {
    return await this.historicoRepo.find({
      order: { dataCriacao: 'DESC' },
    });
  }

  async updateConversao(id: number, payload: Partial<ConversaoHistorico>): Promise<ConversaoHistorico> {
    const conversao = await this.historicoRepo.findOneBy({ id });
    if (!conversao) {
      throw new NotFoundException('Conversão não encontrada');
    }
    const atualizado = Object.assign(conversao, payload);
    return await this.historicoRepo.save(atualizado);
  }
}
