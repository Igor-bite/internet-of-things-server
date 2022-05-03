import { Controller, Render, Get, Query, UseGuards } from "@nestjs/common";
import ProjectsService from './projects.service';
import { SupertokenUserId, UserFromSupertokenId } from "../decorators/user.decorator";
import { ApiQuery } from "@nestjs/swagger";
import NewsService from "../news/news.service";
import TodosService from "../todos/todos.service";
import { AuthGuard } from "../auth/auth.guard";
import { User } from "@prisma/client";

@Controller('projects')
@UseGuards(AuthGuard)
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly newsService: NewsService,
    private readonly todosService: TodosService
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
    @SupertokenUserId(UserFromSupertokenId) user: User,
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
      projects: await this.projectsService.getProjectsPaged(user.id, page),
      currentPage: page,
      pages: pages,
      news: await this.newsService.getRandomNewsPost(user.id),
      todos: await this.todosService.getAllTodos(user.id)
    };
  }
}