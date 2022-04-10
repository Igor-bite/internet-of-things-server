import { Injectable } from "@nestjs/common";
import { Display } from '@prisma/client';
import CreateDisplayDto from "./dto/createDisplay.dto";
import UpdateDisplayDto from "./dto/updateDisplay.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export default class DisplaysService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAllDisplays(userId: number, projectId: number): Promise<Display[]> {
    return await this.prisma.display.findMany({ where: { projectId: Number(projectId) } });
  }

  async getDisplayById(userId: number, displayId: number): Promise<Display> {
    return await this.prisma.display.findFirst({ where: { id: Number(displayId) }});
  }

  async addDisplay(userId: number, displayData: CreateDisplayDto): Promise<Display> {
    return await this.prisma.display.create({ data: displayData });
  }

  async updateDisplay(userId: number, displayId: number, displayData: UpdateDisplayDto): Promise<Display> {
    return await this.prisma.display.update({ where: { id: Number(displayId) }, data: displayData });
  }

  async removeDisplay(userId: number, displayId: number): Promise<Display> {
    return await this.prisma.display.delete({ where: { id: Number(displayId) } });
  }
}