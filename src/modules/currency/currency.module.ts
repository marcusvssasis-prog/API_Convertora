import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { CurrencyRepository } from './repositories/currency.repository';
import { ConversionRepository } from './repositories/conversion.repository';


@Module({
  imports: [HttpModule],
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository, ConversionRepository],
})
export class CurrencyModule {}
