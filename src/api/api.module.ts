import { Module } from "@nestjs/common";
import { ProjectsModule } from "../projects/projects.module";
import { PricesModule } from "../prices/prices.module";
import { TodosModule } from "../todos/todos.module";
import { ControlsModule } from "../controls/controls.module";
import { DisplaysModule } from "../displays/displays.module";
import { NewsModule } from "../news/news.module";
import { UsersModule } from "../users/users.module";
import { DevicesModule } from "../devices/devices.module";
import ApiPricesController from "../prices/api.prices.controller";
import ApiNewsController from "../news/api.news.controller";
import ApiDevicesController from "../devices/api.devices.controller";
import ApiTodosController from "../todos/api.todos.controller";
import ApiUsersController from "../users/api.users.controller";
import ApiControlsController from "../controls/api.controls.controller";
import ApiDisplaysController from "../displays/api.displays.controller";
import ApiProjectsController from "../projects/api.projects.controller";
import ApiAuthController from "../auth/api.auth.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ProjectsModule,
    PricesModule,
    TodosModule,
    ControlsModule,
    DisplaysModule,
    NewsModule,
    UsersModule,
    DevicesModule,
    HttpModule
  ],
  controllers: [
    ApiPricesController,
    ApiProjectsController,
    ApiNewsController,
    ApiTodosController,
    ApiUsersController,
    ApiControlsController,
    ApiDisplaysController,
    ApiDevicesController,
    ApiAuthController
  ]
})
export class ApiModule {}