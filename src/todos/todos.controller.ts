import { Get, Post, Delete, Param, Controller, NotImplementedException, Body } from "@nestjs/common";
import TodosService from './todos.service';
import { User } from '../decorators/user.decorator'
import { ToDo as ToDoModel } from '@prisma/client';

import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAllTodos(@User('id') userId: number): Promise<ToDoModel[]> {
    throw new NotImplementedException();
  }

  @Get(':id')
  async getTodoById(@User('id') userId: number, @Param('id') todoId: string): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  @Post('add')
  async addTodo(@User('id') userId: number, @Body() todoData: { title: string; description?: string }): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  @Post('update/:id')
  async updateTodo(@User('id') userId: number,
                   @Param('id') todoId: string,
                   @Body() todoData: { title?: string; description?: string }): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  @Post('changeState/:id:state')
  async changeState(@User('id') userId: number, @Param('id') todoId: string, @Param('state') state: string): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  @Delete(':id')
  async removeTodo(@User('id') userId: number,  @Param('id') todoId: string): Promise<ToDoModel> {
    throw new NotImplementedException();
  }
}