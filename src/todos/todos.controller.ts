import { Get, Post, Delete, Param, Controller, Body, Put } from "@nestjs/common";
import TodosService from './todos.service';
import { User } from '../decorators/user.decorator'
import { ToDo as ToDoModel, TodoState } from '@prisma/client';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { CreateTodoDto } from "./dto/createTodo.dto";

@ApiBearerAuth()
@ApiTags('todos')
@Controller('todos')
export default class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all todos for user' })
  @ApiResponse({ status: 204, description: 'No todos yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllTodos(
    @User('id') userId: number
  ) {
    return await this.todosService.getAllTodos(userId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Todo found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No todo with this id' })
  async getTodoById(
    @User('id') userId: number,
    @Param('id') todoId: number
  ) {
    return await this.todosService.getTodoById(userId, todoId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new todo' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addTodo(
    @User('id') userId: number,
    @Body() todoData: CreateTodoDto
  ) {
    return await this.todosService.addTodo(userId, todoData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated todo' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No todo with this id' })
  async updateTodo(
    @User('id') userId: number,
    @Param('id') todoId: number,
    @Body() todoData: UpdateTodoDto
  ) {
    return await this.todosService.updateTodo(userId, todoId, todoData);
  }

  @Put(':id/changeState/:state')
  async changeState(
    @User('id') userId: number,
    @Param('id') todoId: number,
    @Param('state') state: TodoState
  ) {
    return await this.todosService.changeState(userId, todoId, state);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Todo was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No todo with this id' })
  async removeTodo(
    @User('id') userId: number,
    @Param('id') todoId: number
  ) {
    return await this.todosService.removeTodo(userId, todoId);
  }
}