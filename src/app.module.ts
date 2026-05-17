import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './modules/currency/currency.module';

@Module({
  imports: [ConfigModule.forRoot(), CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
