import { Injectable, BadRequestException } from '@nestjs/common';
import { CurrencyDto } from '../dtos/currency.dto';
import { CreateConversionDto } from '../dtos/create-conversion.dto';
import { ConversionRepository } from '../repositories/conversion.repository';
import { ConversionEntity } from '../entities/conversion.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class CurrencyService {
  constructor(
    private readonly conversionRepository: ConversionRepository,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService, // Injetando o serviço HTTP
  ) { }

  async calculateConversion(dto: CreateConversionDto): Promise<ConversionEntity> {
    const { amount, fromCurrency, toCurrency } = dto;

    let fromRate: number;
    let toRate: number;
    try {
      const apiKey = this.configService.get<string>('HG_API_KEY');
      const url = `https://api.hgbrasil.com/finance?key=${apiKey}`;

      const response = await firstValueFrom(this.httpService.get(url));

      const fromKey = fromCurrency.toUpperCase();
      const toKey = toCurrency.toUpperCase();

      fromRate = fromKey === 'BRL' ? 1 : response.data.results.currencies[fromKey]?.buy;
      toRate = toKey === 'BRL' ? 1 : response.data.results.currencies[toKey]?.buy;

      if (!fromRate || !toRate) {
        throw new Error(`Moeda não encontrada`);
      }

    } catch (error) {
      throw new BadRequestException(
        `Erro ao buscar a taxa para '${fromCurrency}' ou '${toCurrency}'. Verifique a chave da API ou a conexão.`
      );
    }

    const rateUsed = fromRate / toRate;
    const convertedResult = amount * rateUsed;

    const newConversion = new ConversionEntity();
    newConversion.id = Math.random().toString(36).substring(7);
    newConversion.amount = amount;
    newConversion.fromCurrency = fromCurrency.toUpperCase();
    newConversion.toCurrency = toCurrency.toUpperCase();
    newConversion.rateUsed = rateUsed;
    newConversion.result = convertedResult;
    newConversion.createdAt = new Date();

    return this.conversionRepository.save(newConversion);
  }

  async getAllCurrencies(): Promise<CurrencyDto[]> {
    try {
      const apiKey = this.configService.get<string>('HG_API_KEY');
      const url = `https://api.hgbrasil.com/finance?key=${apiKey}`;

      const response = await firstValueFrom(this.httpService.get(url));
      const currencies = response.data.results.currencies;

      return Object.keys(currencies).map((key): CurrencyDto => {
        const currency = currencies[key];

        return {


          bid: currency.buy ? currency.buy.toString() : '0',
          ask: currency.sell ? currency.sell.toString() : '0',
          timestamp: Math.floor(Date.now() / 1000),

          code: key,
          name: currency.name,
        } as CurrencyDto; // <-- Força o compilador a aceitar que o objeto segue o formato do DTO
      });
    } catch (error) {
      throw new BadRequestException('Nao foi possivel buscar a lista de moedas.');
    }
  }
}
