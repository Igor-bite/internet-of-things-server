import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import NewsService from './news.service';
import { NewsPost } from "@prisma/client";
import { User } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateNewsDto } from "./dto/createNews.dto";

@ApiBearerAuth()
@ApiTags('news')
@Controller('news')
export default class NewsController {
  constructor(
    private readonly newsService: NewsService
  ) {}

  @Get()
  getAllNews(
    @User('id') userId: number
  ): Promise<NewsPost[]> {
    return this.newsService.getAllNews(userId);
  }

  @Get(':id')
  getNewsById(
    @User('id') userId: number,
    @Param('id') newsId: number
  ): Promise<NewsPost> {
    return this.newsService.getNewsById(userId, newsId);
  }

  @Post('add')
  addNews(
    @User('id') userId: number,
    @Body() newsData: CreateNewsDto
  ): Promise<NewsPost> {
    return this.newsService.addNews(userId, newsData);
  }

  @Delete(':id')
  removeNews(
    @User('id') userId: number,
    @Param('id') newsId: number
  ): Promise<NewsPost> {
    return this.newsService.removeNews(userId, newsId);
  }
}