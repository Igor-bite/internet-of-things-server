import { Controller, Render, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import ProjectsService from './projects.service';
import { User } from "../decorators/user.decorator";
import { ApiQuery } from "@nestjs/swagger";
import NewsService from "../news/news.service";
import TodosService from "../todos/todos.service";
import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/lib/build/recipe/session/faunadb";

@Controller('projects')
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
  @UseGuards(AuthGuard)
  async getAllProjectsPaged(
    @Session() session: SessionContainer,
    @User('id') userId: number,
    @Query('page') page?: number
  ) {
    console.log(userId)
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
      news: await this.newsService.getRandomNewsPost(userId),
      todos: await this.todosService.getAllTodos(userId)
    };
  }
}