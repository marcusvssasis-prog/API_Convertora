import { Module } from '@nestjs/common';
import { MoedasService } from './moedas.service';
import { MoedasController } from './moedas.controller';

@Module({
  controllers: [MoedasController],
  providers: [MoedasService],
})
export class MoedasModule {}
