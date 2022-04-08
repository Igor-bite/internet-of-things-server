import { Injectable, NotImplementedException } from "@nestjs/common";
import { NewsPost } from "@prisma/client";
import { CreateNewsDto } from "./dto/createNews.dto";
import { UpdateNewsDto } from "./dto/updateNews.dto";

@Injectable()
export default class NewsService {
  getAllNews(userId: number): Promise<NewsPost[]> {
    throw new NotImplementedException();
  }

  getNewsById(userId: number, projectId: number): Promise<NewsPost> {
    throw new NotImplementedException();
  }

  addNews(userId: number, projectData: CreateNewsDto): Promise<NewsPost> {
    throw new NotImplementedException();
  }

  updateNews(userId: number, newsId: number, newsData: UpdateNewsDto): Promise<NewsPost> {
    throw new NotImplementedException();
  }

  removeNews(userId: number, projectId: number): Promise<NewsPost> {
    throw new NotImplementedException();
  }
}