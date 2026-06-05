import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoedasModule } from './moedas/moedas.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "",
      database: "main",
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),

    MoedasModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
