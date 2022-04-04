import { Controller, Render, Get } from '@nestjs/common';
import PricesService from './prices.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('prices')
@Controller('prices')
export default class PricesController {
  constructor(
    private readonly pricesService: PricesService
  ) {}

  @Get()
  @Render('prices')
  getPricePlans() {
    return { prices: this.pricesService.getPricePlans() };
  }
}