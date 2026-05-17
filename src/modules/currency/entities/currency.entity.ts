import { CurrencyDto } from '../dtos/currency.dto';

export class CurrencyEntity {
  constructor(
    public readonly name: string,
    public readonly code: string,
    public readonly bid: string,
    public readonly ask: string,
    public readonly variation: string,
    public readonly timestamp: number,
  ) {}

  public toDto(): CurrencyDto {
    return {
      name: this.name,
      code: this.code,
      bid: this.bid,
      ask: this.ask,
      variation: this.variation,
      timestamp: this.timestamp,
    };
  }
}
