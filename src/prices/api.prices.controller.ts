import { Controller, Render, Get } from '@nestjs/common';
import PricesService from './prices.service';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('prices')
@Controller('prices')
export default class ApiPricesController {
  constructor(
    private readonly pricesService: PricesService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Returned prices' })
  @ApiResponse({ status: 304, description: 'No changes' })
  getPricePlans() {
    return { prices: this.pricesService.getPricePlans() };
  }
}