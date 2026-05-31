import { Module } from '@nestjs/common';
import { MoedasService } from './moedas.service';
import { MoedasController } from './moedas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotacaoMoeda } from './entities/cotacao-moeda.entity';
import { Moeda } from './entities/moeda.entity';
import { ConversaoHistorico } from './entities/conversao-historico.entity';

@Module({
  controllers: [MoedasController],
  providers: [MoedasService],
  imports: [TypeOrmModule.forFeature([Moeda, CotacaoMoeda, ConversaoHistorico])],
})
export class MoedasModule {}
