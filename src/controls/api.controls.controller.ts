import { Get, Post, Delete, Param, Controller, Body, Put } from "@nestjs/common";
import ControlsService from './controls.service';
import { User } from '../decorators/user.decorator';
import CreateControlDto from "./dto/createControl.dto";
import UpdateControlDto from "./dto/updateControl.dto";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('controls')
@Controller('controls')
export default class ApiControlsController {
  constructor(private readonly controlsService: ControlsService) {}

  @Get('in:projectId')
  @ApiOkResponse({ description: 'Returned all controls for user' })
  @ApiResponse({ status: 204, description: 'No controls yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllControls(
    @User('id') userId: number,
    @Param('projectId') projectId: number
  ) {
    return await this.controlsService.getAllControls(userId, projectId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Control found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No control with this id' })
  async getControlById(
    @User('id') userId: number,
    @Param('id') controlId: number
  ) {
    return await this.controlsService.getControlById(userId, controlId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new control' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addControl(
    @User('id') userId: number,
    @Body() controlData: CreateControlDto
  ) {
    console.log(controlData);
    return await this.controlsService.addControl(userId, controlData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated control' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No control with this id' })
  async updateControl(
    @User('id') userId: number,
    @Param('id') controlId: number,
    @Body() controlData: UpdateControlDto
  ) {
    return await this.controlsService.updateControl(userId, controlId, controlData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Control was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No control with this id' })
  async removeControl(
    @User('id') userId: number,
    @Param('id') controlId: number
  ) {
    return await this.controlsService.removeControl(userId, controlId);
  }
}