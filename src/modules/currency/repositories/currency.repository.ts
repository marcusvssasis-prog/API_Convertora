import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CurrencyEntity } from '../entities/currency.entity';
import { ICurrencyRepository } from '../interfaces/currency-repository.interface';

@Injectable()
export class CurrencyRepository implements ICurrencyRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAllCurrencies(): Promise<CurrencyEntity[]> {
    const apiKey = this.configService.get<string>('HG_API_KEY');
    const url = `https://api.hgbrasil.com/finance?key=${apiKey}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    const rawCurrencies = data.results.currencies;

    return Object.values(rawCurrencies).map(
      (currency: any) =>
        new CurrencyEntity(
          currency.name,
          currency.code,
          currency.bid,
          currency.ask,
          currency.variation,
          currency.timestamp,
        ),
    );
  }
}
