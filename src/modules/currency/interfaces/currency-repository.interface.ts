import { CurrencyEntity } from '../entities/currency.entity';

export interface ICurrencyRepository {
  getAllCurrencies(): Promise<CurrencyEntity[]>;
}
