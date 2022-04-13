import { Controller, Render, Get, Param, ParseIntPipe } from "@nestjs/common";
import ProjectsService from './projects.service';
import { User } from "../decorators/user.decorator";

@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @Render('projects')
  async getAllProjects(@User('id') userId: number) {
    return await this.getAllProjectsPaged(userId, 1);
  }

  @Get('page=:page')
  @Render('projects')
  async getAllProjectsPaged(
    @User('id') userId: number,
    @Param('page', ParseIntPipe) page: number
  ) {
    return {
      projects: await this.projectsService.getAllProjectsPaged(userId, page),
      currentPage: page,
      pages: await this.projectsService.getNumberOfPages()
    };
  }
}