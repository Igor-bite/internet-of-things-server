import { Injectable } from "@nestjs/common";
import { Device } from '@prisma/client';
import CreateDeviceDto from "./dto/createDevice.dto";
import UpdateDeviceDto from "./dto/updateDevice.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export default class DevicesService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAllDevices(userId: number): Promise<Device[]> {
    return await this.prisma.device.findMany();
  }

  async getDeviceById(userId: number, deviceId: number): Promise<Device> {
    return await this.prisma.device.findFirst({ where: { id: Number(deviceId) } });
  }

  async getDeviceByToken(deviceToken: string): Promise<Device> {
    return await this.prisma.device.findFirst({ where: { token: deviceToken } });
  }

  async addDevice(userId: number, deviceData: CreateDeviceDto): Promise<Device> {
    return await this.prisma.device.create({ data: deviceData });
  }

  async updateDevice(userId: number, deviceId: number, deviceData: UpdateDeviceDto): Promise<Device> {
    return await this.prisma.device.update({ where: { id: Number(deviceId) }, data: deviceData });
  }

  async removeDevice(userId: number, deviceId: number): Promise<Device> {
    return await this.prisma.device.delete({ where: { id: Number(deviceId) } });
  }
}