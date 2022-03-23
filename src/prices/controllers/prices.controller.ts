import { Body, Controller, Delete, Render, Get, Param, Post, Put } from '@nestjs/common';
import PricesService from '../services/prices.service';

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