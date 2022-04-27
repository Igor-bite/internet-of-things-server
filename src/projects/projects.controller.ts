import { Controller, Render, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import ProjectsService from './projects.service';
import { User } from "../decorators/user.decorator";
import { ApiQuery } from "@nestjs/swagger";

@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @Render('projects')
  @ApiQuery({
    name: "page",
    type: Number,
    description: "Page number of showing projects. If not presented, returns first page",
    required: false
  })
  async getAllProjectsPaged(
    @User('id') userId: number,
    @Query('page') page?: number
  ) {
    page = Number(page)
    if (!page) {
      page = 1
    }
    return {
      projects: await this.projectsService.getProjectsPaged(userId, page),
      currentPage: page,
      pages: await this.projectsService.getNumberOfPages()
    };
  }
}