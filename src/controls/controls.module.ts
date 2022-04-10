import { Module } from '@nestjs/common';
import ControlsService from "./controls.service";
import ControlsController from "./controls.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [ControlsController],
  providers: [ControlsService, PrismaService],
  exports: [ControlsService]
})
export class ControlsModule {}