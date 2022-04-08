import { Get, Post, Delete, Param, Controller, Body, Put } from "@nestjs/common";
import DevicesService from './devices.service';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import CreateDeviceDto from "./dto/createDevice.dto";
import UpdateDeviceDto from "./dto/updateDevice.dto";

@ApiBearerAuth()
@ApiTags('devices')
@Controller('devices')
export default class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all devices for user' })
  @ApiResponse({ status: 204, description: 'No devices yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllDevices(
    @User('id') userId: number
  ) {
    return await this.devicesService.getAllDevices(userId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Device found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No device with this id' })
  async getDeviceById(
    @User('id') userId: number,
    @Param('id') deviceId: number
  ) {
    return await this.devicesService.getDeviceById(userId, deviceId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new device' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addDevice(
    @User('id') userId: number,
    @Body() deviceData: CreateDeviceDto
  ) {
    return await this.devicesService.addDevice(userId, deviceData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated device' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No device with this id' })
  async updateDevice(
    @User('id') userId: number,
    @Param('id') deviceId: number,
    @Body() deviceData: UpdateDeviceDto
  ) {
    return await this.devicesService.updateDevice(userId, deviceId, deviceData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Device was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No device with this id' })
  async removeTodo(
    @User('id') userId: number,
    @Param('id') deviceId: number
  ) {
    return await this.devicesService.removeDevice(userId, deviceId);
  }
}