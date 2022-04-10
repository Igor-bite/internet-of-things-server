import { Injectable, NotImplementedException } from "@nestjs/common";
import { NewsPost } from "@prisma/client";
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

  async getNewsById(userId: number, postId: number): Promise<NewsPost> {
    return await this.prisma.newsPost.findFirst({ where: { id: Number(postId) }});
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