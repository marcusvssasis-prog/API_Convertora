import { NotFoundException, Injectable, BadRequestException } from '@nestjs/common';
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

  // POST /moedas — registra a moeda
  async create(dto: CreateMoedaDto): Promise<Moeda> {
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
    if (!from || !to || !amount) {
      throw new BadRequestException('Voce precisa enviar from, to e amount no corpo (JSON) da requisicao')
    }
    // pega a hora atual do servidor fixa no fuso de Brasilia/Recife
    const agora = new Date();
    const horaAtualStr = agora.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Recife',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
     // Tenta pegar o valor das moedas direto da logica da funcao de flutuacao
    let taxaFrom = this.getTaxaMoedaFixa(from, horaAtualStr);
    let taxaTo = this.getTaxaMoedaFixa(to, horaAtualStr);

    // Se a moeda da 'from' nao for fixa, busca busca ela e a ultima cotcao no banco
    if (taxaFrom === null) {
      const moedaFrom = await this.moedaRepo.findOne({
        where: { nome: from},
        relations: { cotacoes: true}
      });
      if (!moedaFrom) throw new NotFoundException(`Moeda ${from} nao encontrada no banco`);
      if (!moedaFrom.cotacoes.length) throw new BadRequestException(`Moeda ${from} sem cotacao`);
    
      taxaFrom = moedaFrom.cotacoes
        .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;   
    }
      // Se a moeda 'to' nao for fixa, mesma logica
      if (taxaTo === null) {
        const moedaTo = await this.moedaRepo.findOne({
          where: { nome: to },
          relations: { cotacoes: true }
        });
        if (!moedaTo) throw new NotFoundException(`Moeda ${to} nao encontrada no banco`);
        if (!moedaTo.cotacoes.length) throw new BadRequestException(`Moeda ${to} sem cotacao`);

        taxaTo = moedaTo.cotacoes
        .sort((a, b) => b.dataModificacao.getTime() - a.dataModificacao.getTime())[0].valor;  
      }

      // calcula o resultado final
      const resultado = amount * (taxaFrom / taxaTo);

      return {
        from,
        to,
        amount,
        resultado,
        taxaFrom,
        taxaTo,
        horarioReferencia: horaAtualStr
      };
    }

    // Funçao de flutuacao de moedas 

    private getTaxaMoedaFixa(nomeDaMoeda: string, horarioAtual: string): number | null {
       // A moeda base e Real que tem um valor fixo de 1
      if (nomeDaMoeda == 'BRL') return 1.0;
    
       // caracteres de hora e minuto "HH:mm" para facilitar a comparação
      const hAtual = horarioAtual.substring(0, 5);
      
      // Regras de flutuacao do preco do dolar
      if (nomeDaMoeda === 'USD') {
        if (hAtual >= '07:00' && hAtual < '12:00') return 5.00;
        if (hAtual >= '12:00' && hAtual < '17:00') return 5.20;
        return 7.00;
      }

      // Regra de flutuaçao do Euro
      if (nomeDaMoeda === 'EUR') {
        if (hAtual >= '07:00' && hAtual < '12:00') return 5.40;
        if (hAtual >= '12:00' && hAtual < '17:00') return 7.60;
        return 8.00;
      }

      // Se nenhuma das moedas acima BRL, USD ou EUR for reconhecida, retorna nulo.
      return null;
  }
}

