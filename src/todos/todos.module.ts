import { Module } from "@nestjs/common";
import TodosService from "./todos.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [TodosService],
  exports: [TodosService]
})
export class TodosModule {}