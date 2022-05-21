import { Get, Post, Delete, Param, Controller, Body, Put } from "@nestjs/common";
import ControlsService from './controls.service';
import { SupertokenUserId, UserFromSupertokenId } from'../decorators/user.decorator';
import CreateControlDto from "./dto/createControl.dto";
import UpdateControlDto from "./dto/updateControl.dto";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('controls')
@Controller('controls')
export default class ApiControlsController {
  constructor(private readonly controlsService: ControlsService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all controls for user' })
  @ApiResponse({ status: 204, description: 'No controls yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllControls(
    @SupertokenUserId(UserFromSupertokenId) user: User
  ) {
    return await this.controlsService.getAllControls(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Control found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No control with this id' })
  async getControlById(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') controlId: number
  ) {
    return await this.controlsService.getControlById(user.id, controlId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new control' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addControl(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Body() controlData: CreateControlDto
  ) {
    console.log(controlData);
    return await this.controlsService.addControl(user.id, controlData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated control' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No control with this id' })
  async updateControl(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') controlId: number,
    @Body() controlData: UpdateControlDto
  ) {
    return await this.controlsService.updateControl(user.id, controlId, controlData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Control was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No control with this id' })
  async removeControl(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') controlId: number
  ) {
    return await this.controlsService.removeControl(user.id, controlId);
  }
}