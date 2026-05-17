import { CurrencyDto } from '../dtos/currency.dto';

export interface ICurrencyService {
  getAllCurrencies(): Promise<CurrencyDto[]>;
}
