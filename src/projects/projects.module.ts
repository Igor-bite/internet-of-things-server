import { Module } from '@nestjs/common';
import ProjectsController from './controllers/projects.controller';
import ProjectsService from './services/projects.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}