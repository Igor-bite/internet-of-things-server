import { Get, Post, Delete, Param, Controller, Body } from "@nestjs/common";
import TodosService from './todos.service';
import { User } from '../decorators/user.decorator'
import { ToDo as ToDoModel, TodoState } from '@prisma/client';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('todos')
@Controller('todos')
export default class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAllTodos(
    @User('id') userId: number
  ): Promise<ToDoModel[]> {
    return await this.todosService.getAllTodos(userId);
  }

  @Get(':id')
  async getTodoById(
    @User('id') userId: number,
    @Param('id') todoId: number
  ): Promise<ToDoModel> {
    return await this.todosService.getTodoById(userId, todoId);
  }

  @Post('add')
  async addTodo(
    @User('id') userId: number,
    @Body() todoData: { title: string; description?: string }
  ): Promise<ToDoModel> {
    return await this.todosService.addTodo(userId, todoData);
  }

  @Post('update/:id')
  async updateTodo(
    @User('id') userId: number,
    @Param('id') todoId: number,
    @Body() todoData: { title?: string; description?: string }
  ): Promise<ToDoModel> {
    return await this.todosService.updateTodo(userId, todoId, todoData);
  }

  @Post('changeState/:id&:state')
  async changeState(
    @User('id') userId: number,
    @Param('id') todoId: number,
    @Param('state') state: TodoState
  ): Promise<ToDoModel> {
    return await this.todosService.changeState(userId, todoId, state);
  }

  @Delete(':id')
  async removeTodo(
    @User('id') userId: number,
    @Param('id') todoId: number
  ): Promise<ToDoModel> {
    return await this.todosService.removeTodo(userId, todoId);
  }
}