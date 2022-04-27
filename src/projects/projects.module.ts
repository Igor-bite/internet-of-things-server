import { Module } from '@nestjs/common';
import ProjectsController from './projects.controller';
import ProjectsService from './projects.service';
import { PrismaModule } from "../prisma/prisma.module";
import { ControlsModule } from "../controls/controls.module";
import { DisplaysModule } from "../displays/displays.module";
import { NewsModule } from "../news/news.module";
import { TodosModule } from "../todos/todos.module";

@Module({
  controllers: [ProjectsController],
  imports: [PrismaModule, ControlsModule, DisplaysModule, NewsModule, TodosModule],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}