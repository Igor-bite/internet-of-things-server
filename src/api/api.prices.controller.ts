import { Body, Controller, Delete, Render, Get, Param, Post, Put } from '@nestjs/common';
import PricesService from '../prices/prices.service';

@Controller('prices')
export default class ApiPricesController {
  constructor(
    private readonly pricesService: PricesService
  ) {}

  @Get()
  getPricePlans() {
    return { prices: this.pricesService.getPricePlans() };
  }
}