import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import NewsService from './news.service';
import { User } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateNewsDto } from "./dto/createNews.dto";
import { UpdateNewsDto } from "./dto/updateNews.dto";

@ApiBearerAuth()
@ApiTags('news')
@Controller('news')
export default class ApiNewsController {
  constructor(
    private readonly newsService: NewsService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all news posts for user' })
  @ApiResponse({ status: 204, description: 'No news posts yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllNews(
    @User('id') userId: number
  ) {
    return await this.newsService.getAllNews(userId);
  }

  @Get('page=:page')
  @ApiOkResponse({ description: 'Returned news posts for user with page' })
  @ApiResponse({ status: 204, description: 'No news yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getNewsPaged(
    @User('id') userId: number,
    @Param('page', ParseIntPipe) page: number
  ) {
    return { projects: await this.newsService.getNewsPaged(userId, page) };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'News found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  async getNewsById(
    @User('id') userId: number,
    @Param('id') newsId: number
  ) {
    return await this.newsService.getNewsById(userId, newsId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new news' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addNews(
    @User('id') userId: number,
    @Body() newsData: CreateNewsDto
  ) {
    return await this.newsService.addNews(userId, newsData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated news' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  async updateNews(
    @User('id') userId: number,
    @Param('id') newsId: number,
    @Body() newsData: UpdateNewsDto
  ) {
    return await this.newsService.updateNews(userId, newsId, newsData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'News were deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  async removeNews(
    @User('id') userId: number,
    @Param('id') newsId: number
  ) {
    return await this.newsService.removeNews(userId, newsId);
  }
}