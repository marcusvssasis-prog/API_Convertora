import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { CurrencyDto } from '../dtos/currency.dto';

@Controller('moedas')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getAllCurrencies(): Promise<CurrencyDto[]> {
    return await this.currencyService.getAllCurrencies();
  }
}
