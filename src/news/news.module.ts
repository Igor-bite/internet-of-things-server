import { Module } from '@nestjs/common';
import NewsController from "./news.controller";
import NewsService from "./news.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [NewsController],
  imports: [PrismaModule],
  providers: [NewsService],
  exports: [NewsService]
})
export class NewsModule {}
