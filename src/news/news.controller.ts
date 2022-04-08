import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import NewsService from './news.service';
import { User } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @ApiOkResponse({ description: 'Returned all news posts for user' })
  @ApiResponse({ status: 204, description: 'No news posts yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  getAllNews(
    @User('id') userId: number
  ) {
    return this.newsService.getAllNews(userId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'News found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  getNewsById(
    @User('id') userId: number,
    @Param('id') newsId: number
  ) {
    return this.newsService.getNewsById(userId, newsId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new news' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  addNews(
    @User('id') userId: number,
    @Body() newsData: CreateNewsDto
  ) {
    return this.newsService.addNews(userId, newsData);
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
    return this.newsService.updateNews(userId, newsId, newsData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'News were deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  removeNews(
    @User('id') userId: number,
    @Param('id') newsId: number
  ) {
    return this.newsService.removeNews(userId, newsId);
  }
}