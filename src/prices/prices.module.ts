import { Module } from '@nestjs/common';
import PricesController from './prices.controller';
import PricesService from './prices.service';

@Module({
  imports: [],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService]
})
export class PricesModule {}