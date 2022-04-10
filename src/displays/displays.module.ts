import { Module } from '@nestjs/common';
import DisplaysService from "./displays.service";
import DisplaysController from "./displays.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [DisplaysController],
  imports: [PrismaModule],
  providers: [DisplaysService],
  exports: [DisplaysService]
})
export class DisplaysModule {}