import { Get, Post, Delete, Param, Controller, Body } from "@nestjs/common";
import ControlsService from './controls.service';
import { User } from '../decorators/user.decorator';
import CreateControlDto from "./dto/createControl.dto";
import UpdateControlDto from "./dto/updateControl.dto";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('controls')
@Controller('controls')
export default class ControlsController {
  constructor(private readonly todosService: ControlsService) {}

  @Get()
  async getAllControls(
    @User('id') userId: number
  ) {
    return await this.todosService.getAllControls(userId);
  }

  @Get(':id')
  async getControlById(
    @User('id') userId: number,
    @Param('id') controlId: number
  ) {
    return await this.todosService.getControlById(userId, controlId);
  }

  @Post('add')
  async addControl(
    @User('id') userId: number,
    @Body() controlData: CreateControlDto
  ) {
    return await this.todosService.addControl(userId, controlData);
  }

  @Post(':id/update')
  async updateControl(
    @User('id') userId: number,
    @Param('id') controlId: number,
    @Body() controlData: UpdateControlDto
  ) {
    return await this.todosService.updateControl(userId, controlId, controlData);
  }

  @Delete(':id')
  async removeControl(
    @User('id') userId: number,
    @Param('id') controlId: number
  ) {
    return await this.todosService.removeControl(userId, controlId);
  }
}