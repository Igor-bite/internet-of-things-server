import { Module } from '@nestjs/common';
import { RouterModule } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from "./api/api.module";

@Module({
  imports: [ConfigModule.forRoot(),
            ApiModule,
            RouterModule.register([
              {
                path: 'api',
                module: ApiModule,
              }]
            )
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
