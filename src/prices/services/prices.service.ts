import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Price } from "../price.interface";

@Injectable()
export default class PricesService {
  private prices: Price[] = [{id: 1, planName: "Lite", priceForMonth: 34, devicesMax: 2, usersMax: 5, widgetsTypes: "Basic", logsStorageTime: "1 week", buttonActionText: "Try for free"},
                              {id: 1, planName: "Lite Plus", priceForMonth: 50, devicesMax: 10, usersMax: 10, widgetsTypes: "Mobile PRO", logsStorageTime: "3 months", buttonActionText: "Try for free"},
                              {id: 1, planName: "Pro", priceForMonth: 70, devicesMax: 40, usersMax: 40, widgetsTypes: "Mobile PRO", logsStorageTime: "Unlimited time", buttonActionText: "Try for free"}];

  getPricePlans() {
    return this.prices;
  }
}