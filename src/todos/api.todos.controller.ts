import { Get, Post, Delete, Param, Controller, Body, Put, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import TodosService from './todos.service';
import { SupertokenUserId, UserFromSupertokenId } from'../decorators/user.decorator'
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateTodoDto } from "./dto/updateTodo.dto";
import { CreateTodoDto } from "./dto/createTodo.dto";
import { User } from "@prisma/client";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
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
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Query('page') page: number
  ) {
    if (!page) {
      return { todos: await this.todosService.getAllTodos(user.id) };
    }
    page = Number(page)
    return { todos: await this.todosService.getTodosPaged(user.id, page) };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Todo found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No todo with this id' })
  async getTodoById(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') todoId: number
  ) {
    return await this.todosService.getTodoById(user.id, todoId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new todo' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addTodo(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Body() todoData: CreateTodoDto
  ) {
    return await this.todosService.addTodo(user.id, todoData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated todo' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No todo with this id' })
  async updateTodo(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') todoId: number,
    @Body() todoData: UpdateTodoDto
  ) {
    return await this.todosService.updateTodo(user.id, todoId, todoData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Todo was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No todo with this id' })
  async removeTodo(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') todoId: number
  ) {
    return await this.todosService.removeTodo(user.id, todoId);
  }
}