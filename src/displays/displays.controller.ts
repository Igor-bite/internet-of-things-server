import { Get, Post, Delete, Param, Body, Controller, Put } from "@nestjs/common";
import { User } from '../decorators/user.decorator';
import DisplaysService from "./displays.service";
import CreateDisplayDto from "./dto/createDisplay.dto";
import UpdateDisplayDto from "./dto/updateDisplay.dto";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('displays')
@Controller('displays')
export default class DisplaysController {
  constructor(private readonly todosService: DisplaysService) {}

  @Get()
  async getAllDisplays(
    @User('id') userId: number
  ) {
    return await this.todosService.getAllDisplays(userId);
  }

  @Get(':id')
  async getDisplayById(
    @User('id') userId: number,
    @Param('id') displayId: number
  ) {
    return await this.todosService.getDisplayById(userId, displayId);
  }

  @Post()
  async addDisplay(
    @User('id') userId: number,
    @Body() displayData: CreateDisplayDto
  ) {
    return await this.todosService.addDisplay(userId, displayData);
  }

  @Put(':id')
  async updateTodo(
    @User('id') userId: number,
    @Param('id') displayId: number,
    @Body() displayData: UpdateDisplayDto
  ) {
    return await this.todosService.updateDisplay(userId, displayId, displayData);
  }

  @Delete(':id')
  async removeTodo(
    @User('id') userId: number,
    @Param('id') displayId: number
  ) {
    return await this.todosService.removeDisplay(userId, displayId);
  }
}