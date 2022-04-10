import { Injectable, NotImplementedException } from "@nestjs/common";
import { Control } from '@prisma/client';
import CreateControlDto from "./dto/createControl.dto";
import UpdateControlDto from "./dto/updateControl.dto";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class ControlsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAllControls(userId: number): Promise<Control[]> {
    return await this.prisma.control.findMany();
  }

  async getControlById(userId: number, controlId: number): Promise<Control> {
    return await this.prisma.control.findFirst({ where: { id: Number(controlId) }});
  }

  async addControl(userId: number, controlData: CreateControlDto): Promise<Control> {
    return await this.prisma.control.create({ data: controlData });
  }

  async updateControl(userId: number, controlId: number, controlData: UpdateControlDto): Promise<Control> {
    return await this.prisma.control.update({ where: { id: controlId }, data: controlData });
  }

  async removeControl(userId: number, controlId: number): Promise<Control> {
    return await this.prisma.control.delete({ where: { id: controlId } });
  }
}