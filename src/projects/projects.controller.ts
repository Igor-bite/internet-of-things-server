import { Controller, Render, Get } from "@nestjs/common";
import ProjectsService from './projects.service';
import { User } from "../decorators/user.decorator";

@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @Render('projects')
  getAllProjects(
    @User('id') userId: number
  ) {
    return { projects: this.projectsService.getAllProjects(userId) };
  }
}