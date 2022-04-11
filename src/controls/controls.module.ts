import { Module } from '@nestjs/common';
import ControlsService from "./controls.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ControlsService],
  exports: [ControlsService]
})
export class ControlsModule {}