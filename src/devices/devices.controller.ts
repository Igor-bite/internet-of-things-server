import { Get, Post, Delete, Param, Controller, Body } from "@nestjs/common";
import DevicesService from './devices.service';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CreateDeviceDto from "./dto/createDevice.dto";
import UpdateDeviceDto from "./dto/updateDevice.dto";

@ApiBearerAuth()
@ApiTags('devices')
@Controller('devices')
export default class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async getAllDevices(
    @User('id') userId: number
  ) {
    return await this.devicesService.getAllDevices(userId);
  }

  @Get(':id')
  async getDeviceById(
    @User('id') userId: number,
    @Param('id') deviceId: number
  ) {
    return await this.devicesService.getDeviceById(userId, deviceId);
  }

  @Post('add')
  async addDevice(
    @User('id') userId: number,
    @Body() deviceData: CreateDeviceDto
  ) {
    return await this.devicesService.addDevice(userId, deviceData);
  }

  @Post(':id/update')
  async updateDevice(
    @User('id') userId: number,
    @Param('id') deviceId: number,
    @Body() deviceData: UpdateDeviceDto
  ) {
    return await this.devicesService.updateDevice(userId, deviceId, deviceData);
  }

  @Delete(':id')
  async removeTodo(
    @User('id') userId: number,
    @Param('id') deviceId: number
  ) {
    return await this.devicesService.removeDevice(userId, deviceId);
  }
}