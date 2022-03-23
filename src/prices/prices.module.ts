import { Module } from '@nestjs/common';
import PricesController from './controllers/prices.controller';
import PricesService from './services/prices.service';

@Module({
  imports: [],
  controllers: [PricesController],
  providers: [PricesService],
  exports: [PricesService]
})
export class PricesModule {}