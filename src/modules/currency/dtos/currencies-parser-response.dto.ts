export class CurrencyItemDto {
  nome: string;
  codigo: string;
  compra: string;
  venda: string;
}

export class CurrenciesParserResponseDto {
  data: string;
  total: number;
  moedas: CurrencyItemDto[];
}
