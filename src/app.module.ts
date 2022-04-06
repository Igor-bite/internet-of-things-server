import { Module } from '@nestjs/common';
import { RouterModule } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from "./projects/projects.module";
import { PricesModule } from "./prices/prices.module";
import { ApiModule } from "./api/api.module";
import { TodosModule } from './todos/todos.module';
import { ControlsModule } from './controls/controls.module';
import { NewsModule } from './news/news.module';
import { UsersModule } from "./users/users.module";
import { DevicesModule } from "./devices/devices.module";
import { DisplaysModule } from "./displays/displays.module";

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
            ),
            TodosModule,
            ControlsModule,
            DisplaysModule,
            NewsModule,
            UsersModule,
            DevicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ProjectsModule,
            PricesModule,
            TodosModule,
            ControlsModule,
            DisplaysModule,
            NewsModule,
            UsersModule,
            DevicesModule]
})
export class AppModule {}
