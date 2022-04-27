import { Get, Post, Delete, Param, Controller, Body, Put, ParseIntPipe, Query } from "@nestjs/common";
import TodosService from './todos.service';
import { User } from '../decorators/user.decorator'
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { CreateTodoDto } from "./dto/createTodo.dto";

@ApiBearerAuth()
@ApiTags('todos')
@Controller('todos')
export default class ApiTodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all todos for user with page' })
  @ApiResponse({ status: 204, description: 'No todos yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiQuery({
    name: "page",
    type: Number,
    description: "Page number of returned Todos. If not presented, returns all todos",
    required: false
  })
  async getTodosPaged(
    @User('id') userId: number,
    @Query('page') page: number
  ) {
    if (!page) {
      return { todos: await this.todosService.getAllTodos(userId) };
    }
    page = Number(page)
    return { todos: await this.todosService.getTodosPaged(userId, page) };
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