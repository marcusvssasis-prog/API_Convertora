import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { CurrencyDto } from '../dtos/currency.dto';
import { CreateConversionDto } from '../dtos/create-conversion.dto';
import { CurrenciesParserResponseDto } from '../dtos/currencies-parser-response.dto';
import { ConversionParserResponseDto } from '../dtos/conversion-parser-response.dto';

@Controller('moedas')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getAllCurrencies(): Promise<CurrencyDto[]> {
    return await this.currencyService.getAllCurrencies();
  }

  @Get('parser')
  async getAllCurrenciesParsed(): Promise<CurrenciesParserResponseDto> {
    return await this.currencyService.getAllCurrenciesParsed();
  }

  @Post('converter')
  async createConversionDto(
    @Body() createConversionDto: CreateConversionDto,
  ) {
    return await this.currencyService.calculateConversion(createConversionDto);
  }

  @Post('converter/parser')
  async createConversionParsed(
    @Body() createConversionDto: CreateConversionDto,
  ): Promise<ConversionParserResponseDto> {
    return await this.currencyService.calculateConversionParsed(createConversionDto);
  }
}
