import { Get, Post, Delete, Param, Controller, Body, Put, UseGuards } from "@nestjs/common";
import DevicesService from './devices.service';
import { SupertokenUserId, UserFromSupertokenId } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import CreateDeviceDto from "./dto/createDevice.dto";
import UpdateDeviceDto from "./dto/updateDevice.dto";
import { User } from "@prisma/client";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@ApiTags('devices')
@Controller('devices')
export default class ApiDevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all devices for user' })
  @ApiResponse({ status: 204, description: 'No devices yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllDevices(
    @SupertokenUserId(UserFromSupertokenId) user: User
  ) {
    return await this.devicesService.getAllDevices(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Device found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No device with this id' })
  async getDeviceById(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') deviceId: number
  ) {
    return await this.devicesService.getDeviceById(user.id, deviceId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new device' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addDevice(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Body() deviceData: CreateDeviceDto
  ) {
    return await this.devicesService.addDevice(user.id, deviceData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated device' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No device with this id' })
  async updateDevice(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') deviceId: number,
    @Body() deviceData: UpdateDeviceDto
  ) {
    return await this.devicesService.updateDevice(user.id, deviceId, deviceData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Device was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No device with this id' })
  async removeTodo(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') deviceId: number
  ) {
    return await this.devicesService.removeDevice(user.id, deviceId);
  }
}