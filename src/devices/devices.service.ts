import { Injectable, NotImplementedException } from "@nestjs/common";
import { Device } from '@prisma/client';
import CreateDeviceDto from "./dto/createDevice.dto";
import UpdateDeviceDto from "./dto/updateDevice.dto";

@Injectable()
export default class DevicesService {
  getAllDevices(userId: number): Promise<Device[]> {
    throw new NotImplementedException();
  }

  getDeviceById(userId: number, deviceId: number): Promise<Device> {
    throw new NotImplementedException();
  }

  addDevice(userId: number, deviceData: CreateDeviceDto): Promise<Device> {
    throw new NotImplementedException();
  }

  updateDevice(userId: number, deviceId: number, deviceData: UpdateDeviceDto): Promise<Device> {
    throw new NotImplementedException();
  }

  removeDevice(userId: number, deviceId: number): Promise<Device> {
    throw new NotImplementedException();
  }
}