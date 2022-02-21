import { Module } from '@nestjs/common';
import { RouterModule } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from "./projects/projects.module";
import { PricesModule } from "./prices/prices.module";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [ConfigModule.forRoot(),
            ProjectsModule,
            PricesModule,
            ApiModule,
            RouterModule.register([
              {
                path: 'api',
                module: ApiModule,
              }]
            )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
