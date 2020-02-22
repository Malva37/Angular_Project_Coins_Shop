import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/coins.service';
import { ICoin } from 'src/app/shared/interfaces/coins.interfaces';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  constructor(private prService: ProductsService) { }
  coins: Array<ICoin> = [];
  productPrices: Array<number> = [];
  buttonsShow: boolean;
  minValue: number = 10;
  maxValue: number;
  options: Options = {
    floor: 0,
    ceil: 2000,
    showTicks: true
  };


  ngOnInit() {
    this.getCoins();
  }

  getMaxPrice(arr:Array<number>): number {
    arr = this.productPrices
    let max = arr[0];
    for (let i = 0; i <= arr.length; i++) {
      if (i > max) {
        i = max;
      }
      return this.maxValue = max;
    }
  }


  private getCoins(): void {
    this.prService.getJSONCoins().subscribe(
      data => {
        this.coins = data;
        for (const coin in this.coins) {
          const object = this.coins[coin];
          this.productPrices.push(object.price);
        }
      })
    this.getMaxPrice();
  }





}
