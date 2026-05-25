import { Controller, Get, Post, Body} from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { CurrencyDto } from '../dtos/currency.dto';
import { CreateConversionDto } from '../dtos/create-conversion.dto';

@Controller('moedas')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getAllCurrencies(): Promise<CurrencyDto[]> {
    return await this.currencyService.getAllCurrencies();
  }

  @Post('converter')
  async createConversionDto(
  
  @Body() createConversionDto: CreateConversionDto) {

  return await this.currencyService.calculateConversion(createConversionDto);
  }
}
