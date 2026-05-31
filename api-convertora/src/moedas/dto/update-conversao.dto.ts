import { PartialType } from '@nestjs/mapped-types';

export class UpdateConversaoDto {
  moedaFrom?: string;
  moedaTo?: string;
  amount?: number;
  resultado?: number;
  taxaFrom?: number;
  taxaTo?: number;
}

export class UpdateConversaoPartialDto extends PartialType(UpdateConversaoDto) {}
