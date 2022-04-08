import { Get, Post, Delete, Param, Body, Controller, Put } from "@nestjs/common";
import { User } from '../decorators/user.decorator';
import DisplaysService from "./displays.service";
import CreateDisplayDto from "./dto/createDisplay.dto";
import UpdateDisplayDto from "./dto/updateDisplay.dto";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('displays')
@Controller('displays')
export default class DisplaysController {
  constructor(private readonly todosService: DisplaysService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all displays for user' })
  @ApiResponse({ status: 204, description: 'No displays yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllDisplays(
    @User('id') userId: number
  ) {
    return await this.todosService.getAllDisplays(userId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Display found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No display with this id' })
  async getDisplayById(
    @User('id') userId: number,
    @Param('id') displayId: number
  ) {
    return await this.todosService.getDisplayById(userId, displayId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new display' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addDisplay(
    @User('id') userId: number,
    @Body() displayData: CreateDisplayDto
  ) {
    return await this.todosService.addDisplay(userId, displayData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated display' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No display with this id' })
  async updateTodo(
    @User('id') userId: number,
    @Param('id') displayId: number,
    @Body() displayData: UpdateDisplayDto
  ) {
    return await this.todosService.updateDisplay(userId, displayId, displayData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Display was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No display with this id' })
  async removeTodo(
    @User('id') userId: number,
    @Param('id') displayId: number
  ) {
    return await this.todosService.removeDisplay(userId, displayId);
  }
}