import { Controller, Render, Get } from '@nestjs/common';
import PricesService from './prices.service';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('prices')
@Controller('prices')
export default class PricesController {
  constructor(
    private readonly pricesService: PricesService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Returned prices' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @Render('prices')
  getPricePlans() {
    return { prices: this.pricesService.getPricePlans() };
  }
}