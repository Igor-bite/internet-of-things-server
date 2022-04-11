import { Module } from '@nestjs/common';
import NewsService from "./news.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [NewsService],
  exports: [NewsService]
})
export class NewsModule {}
