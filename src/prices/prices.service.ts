import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import CreatePostDto from './dto/createPost.dto';
import { Price } from "./price.interface";
// import UpdatePostDto from './dto/updatePost.dto';

@Injectable()
export default class PricesService {
  private prices: Price[] = [{id: 1, priceForMonth: 34, priceForYear: 349, planName: "Lite"},
                             {id: 2, priceForMonth: 50, priceForYear: 499, planName: "Lite Plus"},
                             {id: 3, priceForMonth: 100, priceForYear: 999, planName: "Pro"}];

  getPricePlans() {
    return this.prices;
  }
}