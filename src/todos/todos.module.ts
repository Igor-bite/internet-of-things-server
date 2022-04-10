import { Module } from "@nestjs/common";
import TodosController from "./todos.controller";
import TodosService from "./todos.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [TodosController],
  imports: [PrismaModule],
  providers: [TodosService],
  exports: [TodosService]
})
export class TodosModule {}