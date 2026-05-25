export class ConversionEntity {
    id: string;
    amount: number;
    fromCurrency: string;
    toCurrency: string; // Ex: Fixo em 'BRL' ou dinâmico
    rateUsed: number;
    result: number;
    createdAt: Date;
}