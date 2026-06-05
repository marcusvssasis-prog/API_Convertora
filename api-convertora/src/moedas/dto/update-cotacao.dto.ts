import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateCotacaoDto {
  @IsNotEmpty()
  @IsNumber()
  valor!: number;
}