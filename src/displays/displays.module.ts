import { Module } from '@nestjs/common';
import DisplaysService from "./displays.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DisplaysService],
  exports: [DisplaysService]
})
export class DisplaysModule {}