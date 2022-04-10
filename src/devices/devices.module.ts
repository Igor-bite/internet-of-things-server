import { Module } from '@nestjs/common';
import DevicesService from "./devices.service";
import DevicesController from "./devices.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [DevicesController],
  imports: [PrismaModule],
  providers: [DevicesService],
  exports: [DevicesService]
})
export class DevicesModule {}