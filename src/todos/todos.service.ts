import { Injectable, NotImplementedException } from "@nestjs/common";
import { Project, ToDo as ToDoModel, TodoState } from "@prisma/client";
import { CreateTodoDto } from "./dto/createTodo.dto";
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export default class TodosService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAllTodos(userId: number): Promise<ToDoModel[]> {
    return await this.prisma.toDo.findMany({ where: { ownerId: Number(userId) } });
  }

  async getTodosPaged(userId: number, page: number, todosOnPage: number = 4): Promise<ToDoModel[]> {
    return await this.prisma.toDo.findMany({
      where: {
        ownerId: Number(userId)
      },
      skip: todosOnPage * (page - 1),
      take: todosOnPage,
      orderBy: {
        id: 'asc'
      }
    })
  }

  async getTodoById(userId: number, todoId: number): Promise<ToDoModel> {
    return await this.prisma.toDo.findFirst({ where: { id: Number(todoId) }});
  }

  async addTodo(userId: number, todoData: CreateTodoDto): Promise<ToDoModel> {
    return await this.prisma.toDo.create({ data: todoData });
  }

  async updateTodo(userId: number, todoId: number, todoData: UpdateTodoDto): Promise<ToDoModel> {
    return await this.prisma.toDo.update({ where: { id: Number(todoId) }, data: todoData });
  }

  async removeTodo(userId: number, todoId: number): Promise<ToDoModel> {
    return await this.prisma.toDo.delete({ where: { id: Number(todoId) } });
  }
}