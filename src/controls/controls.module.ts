import { Module } from '@nestjs/common';
import ControlsService from "./controls.service";
import ControlsController from "./controls.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [ControlsController],
  imports: [PrismaModule],
  providers: [ControlsService],
  exports: [ControlsService]
})
export class ControlsModule {}