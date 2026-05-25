import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './modules/currency/currency.module';
import { HttpModule } from '@nestjs/axios';
import { ConversionRepository } from './modules/currency/repositories/conversion.repository';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), 
    CurrencyModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
