import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from "./projects/projects.module";
import { PricesModule } from "./prices/prices.module";

@Module({
  imports: [ConfigModule.forRoot(), ProjectsModule, PricesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
