import { Get, Post, Delete, Param, Controller, Body, Put } from "@nestjs/common";
import TodosService from './todos.service';
import { User } from '../decorators/user.decorator'
import { ToDo as ToDoModel, TodoState } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { CreateTodoDto } from "./dto/createTodo.dto";

@ApiBearerAuth()
@ApiTags('todos')
@Controller('todos')
export default class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAllTodos(
    @User('id') userId: number
  ) {
    return await this.todosService.getAllTodos(userId);
  }

  @Get(':id')
  async getTodoById(
    @User('id') userId: number,
    @Param('id') todoId: number
  ) {
    return await this.todosService.getTodoById(userId, todoId);
  }

  @Post()
  async addTodo(
    @User('id') userId: number,
    @Body() todoData: CreateTodoDto
  ) {
    return await this.todosService.addTodo(userId, todoData);
  }

  @Put(':id')
  async updateTodo(
    @User('id') userId: number,
    @Param('id') todoId: number,
    @Body() todoData: UpdateTodoDto
  ) {
    return await this.todosService.updateTodo(userId, todoId, todoData);
  }

  @Get(':id/changeState/:state')
  async changeState(
    @User('id') userId: number,
    @Param('id') todoId: number,
    @Param('state') state: TodoState
  ) {
    return await this.todosService.changeState(userId, todoId, state);
  }

  @Delete(':id')
  async removeTodo(
    @User('id') userId: number,
    @Param('id') todoId: number
  ) {
    return await this.todosService.removeTodo(userId, todoId);
  }
}