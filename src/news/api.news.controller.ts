import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import NewsService from './news.service';
import { SupertokenUserId, UserFromSupertokenId } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateNewsDto } from "./dto/createNews.dto";
import { UpdateNewsDto } from "./dto/updateNews.dto";
import { User } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('news')
@Controller('news')
export default class ApiNewsController {
  constructor(
    private readonly newsService: NewsService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Returned news posts for user with page' })
  @ApiResponse({ status: 204, description: 'No news yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiQuery({
    name: "page",
    type: Number,
    description: "Page number of returned news posts. If not presented, returns all news",
    required: false
  })
  async getNewsPaged(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Query('page') page?: number
  ) {
    if (!page) {
      return { news: await this.newsService.getAllNews(user.id) };
    }
    page = Number(page)
    return { news: await this.newsService.getNewsPaged(user.id, page) };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'News found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  async getNewsById(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') newsId: number
  ) {
    return await this.newsService.getNewsById(user.id, newsId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new news' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addNews(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Body() newsData: CreateNewsDto
  ) {
    return await this.newsService.addNews(user.id, newsData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated news' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  async updateNews(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') newsId: number,
    @Body() newsData: UpdateNewsDto
  ) {
    return await this.newsService.updateNews(user.id, newsId, newsData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'News were deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No news with this id' })
  async removeNews(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') newsId: number
  ) {
    return await this.newsService.removeNews(user.id, newsId);
  }
}