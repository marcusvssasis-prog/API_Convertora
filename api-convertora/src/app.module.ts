import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoedasModule } from './moedas/moedas.module';

@Module({
  imports: [MoedasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
