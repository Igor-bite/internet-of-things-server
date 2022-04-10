import { Module } from '@nestjs/common';
import ProjectsController from './projects.controller';
import ProjectsService from './projects.service';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [ProjectsController],
  imports: [PrismaModule],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}