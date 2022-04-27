import { Controller, Render, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import ProjectsService from './projects.service';
import { User } from "../decorators/user.decorator";
import { ApiQuery } from "@nestjs/swagger";
import NewsService from "../news/news.service";

@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly newsService: NewsService
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
    const pages = await this.projectsService.getNumberOfPages();
    if (page > pages) {
      page = pages
    }
    return {
      projects: await this.projectsService.getProjectsPaged(userId, page),
      currentPage: page,
      pages: pages,
      news: await this.newsService.getRandomNewsPost(userId)
    };
  }
}