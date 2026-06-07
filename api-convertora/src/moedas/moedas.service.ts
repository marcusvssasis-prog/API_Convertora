import { ConflictException, NotFoundException, Injectable, BadRequestException } from '@nestjs/common';
import { CreateMoedaDto } from './dto/create-moeda.dto';
import { UpdateMoedaDto } from './dto/update-moeda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Moeda } from './entities/moeda.entity';
import { CotacaoMoeda } from './entities/cotacao-moeda.entity';
import { UpdateCotacaoDto } from './dto/update-cotacao.dto';


@Injectable()
export class MoedasService {
  constructor(
    @InjectRepository(Moeda)
    private moedaRepo: Repository<Moeda>,
    @InjectRepository(CotacaoMoeda)
    private cotacaoRepo: Repository<CotacaoMoeda>
  ) { }
// POST /moedas — cria nova moeda
 async create(dto: CreateMoedaDto): Promise<Moeda> {
  const existente = await this.moedaRepo.findOne({
    where: { nome: dto.nome },
  });

  if (existente) {
    throw new ConflictException(
      `Moeda já existe com id ${existente.id}`,
    );
  }

  const moeda = this.moedaRepo.create({ nome: dto.nome });
  return await this.moedaRepo.save(moeda);
}
  // POST /moedas/:id/cotacao — adiciona valor à moeda
  async addCotacao(id: number, valor: number): Promise<CotacaoMoeda> {
    const moeda = await this.moedaRepo.findOneBy({ id });
    if (!moeda) {
      throw new NotFoundException(`Moeda com ID ${id} não encontrada`);
    }
    const cotacao = this.cotacaoRepo.create({ valor, moeda });
    return await this.cotacaoRepo.save(cotacao);
  }

  // Modificar cotacao ja existente no banco
  async updateCotacao(id: number, dto: UpdateCotacaoDto): Promise<CotacaoMoeda> {
    // 1. Verifica se a cotação realmente existe no banco antes de atualizar
    const cotacaoExiste = await this.cotacaoRepo.findOneBy({ id });

    if (!cotacaoExiste) {
      throw new NotFoundException(`Cotação com ID ${id} não encontrada`)
    }

    //2. Atualiza o valor no MariaDB
    await this.cotacaoRepo.update(id, { valor: dto.valor}); 

    return await this.cotacaoRepo.findOneOrFail({
      where: { id },
    });
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
      throw new NotFoundException(`Moeda com ID ${id} não encontrada`);
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
    // pega a ultima cotacao
    const moedaFrom = await this.moedaRepo.findOne({
      where: { nome: from },
      relations: { cotacoes: true }
    });
    const moedaTo = await this.moedaRepo.findOne({
      where: { nome: to },
      relations: { cotacoes: true }
    });

    if (!moedaFrom || !moedaTo) throw new NotFoundException('Moeda não encontrada');
    if (!moedaFrom.cotacoes.length || !moedaTo.cotacoes.length)
      throw new BadRequestException('Moeda sem cotação registrada');

    // cotacao por dataModificacao
    const taxaFrom = moedaFrom.cotacoes
      .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;

    const taxaTo = moedaTo.cotacoes
      .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;

    const resultado = amount * (taxaTo / taxaFrom);

    return { from, to, amount, resultado, taxaFrom, taxaTo };
  }
}
