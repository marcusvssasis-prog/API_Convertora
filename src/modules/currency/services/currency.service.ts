import { Injectable } from '@nestjs/common';
import { CurrencyDto } from '../dtos/currency.dto';
import { ICurrencyService } from '../interfaces/currency-service.interface';
import { CurrencyRepository } from '../repositories/currency.repository';

@Injectable()
export class CurrencyService implements ICurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async getAllCurrencies(): Promise<CurrencyDto[]> {
    const currencies = await this.currencyRepository.getAllCurrencies();
    return currencies.map((currency) => currency.toDto());
  }
}
