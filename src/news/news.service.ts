import { Injectable, NotImplementedException } from "@nestjs/common";
import { NewsPost, Project } from "@prisma/client";
import { CreateNewsDto } from "./dto/createNews.dto";
import { UpdateNewsDto } from "./dto/updateNews.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export default class NewsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAllNews(userId: number): Promise<NewsPost[]> {
    return await this.prisma.newsPost.findMany();
  }

  async getNewsPaged(userId: number, page: number, newsOnPage: number = 4): Promise<NewsPost[]> {
    return await this.prisma.newsPost.findMany({
      skip: newsOnPage * (page - 1),
      take: newsOnPage,
      orderBy: {
        id: 'asc'
      }
    })
  }

  async getNewsById(userId: number, postId: number): Promise<NewsPost> {
    return await this.prisma.newsPost.findFirst({ where: { id: Number(postId) }});
  }

  async getRandomNewsPost(userId: number): Promise<NewsPost> {
    const min = 0;
    const max = await this.prisma.newsPost.count() - 1;
    const skip = Math.floor(Math.random() * (max - min + 1) + min)
    return (await this.prisma.newsPost.findMany({
      take: 1,
      skip: skip,
    }))[0];
  }

  async addNews(userId: number, postData: CreateNewsDto): Promise<NewsPost> {
    return await this.prisma.newsPost.create({ data: postData });
  }

  async updateNews(userId: number, postId: number, postData: UpdateNewsDto): Promise<NewsPost> {
    return await this.prisma.newsPost.update({ where: { id: Number(postId) }, data: postData });
  }

  async removeNews(userId: number, postId: number): Promise<NewsPost> {
    return await this.prisma.newsPost.delete({ where: { id: Number(postId) } });
  }
}