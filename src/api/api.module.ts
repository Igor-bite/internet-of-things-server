import { Module } from '@nestjs/common';
import { PricesModule } from "../prices/prices.module";
import ApiPricesController from "./api.prices.controller";

@Module({
  imports: [PricesModule],
  controllers: [ApiPricesController],
  providers: []
})
export class ApiModule {}