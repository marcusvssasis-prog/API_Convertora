import {IsNumber, IsString, IsPositive, Length } from  'class-validator';

export class CreateConversionDto {
    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsString()
    @Length(3, 3)
    fromCurrency!: string;
    
}