import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import NewsService from './news.service';
import { User } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateNewsDto } from "./dto/createNews.dto";
import UpdateDisplayDto from "../displays/dto/updateDisplay.dto";
import { UpdateNewsDto } from "./dto/updateNews.dto";

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
  ) {
    return this.newsService.getAllNews(userId);
  }

  @Get(':id')
  getNewsById(
    @User('id') userId: number,
    @Param('id') newsId: number
  ) {
    return this.newsService.getNewsById(userId, newsId);
  }

  @Post()
  addNews(
    @User('id') userId: number,
    @Body() newsData: CreateNewsDto
  ) {
    return this.newsService.addNews(userId, newsData);
  }

  @Put(':id')
  async updateNews(
    @User('id') userId: number,
    @Param('id') newsId: number,
    @Body() newsData: UpdateNewsDto
  ) {
    return this.newsService.updateNews(userId, newsId, newsData);
  }

  @Delete(':id')
  removeNews(
    @User('id') userId: number,
    @Param('id') newsId: number
  ) {
    return this.newsService.removeNews(userId, newsId);
  }
}