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
  searchName: string;


  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  // minValue: number;
  // maxValue: number;
  // options: Options = {
  //   floor: 0,
  //   ceil: 100,
  //   showTicks: true
  // };




  ngOnInit() {
    this.getCoins();
  }

  getMaxPrice(arr: Array<number>): number {
    arr = this.productPrices
    let max = arr[0];
    for (let i = 1; i < arr.length; ++i) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    this.options.ceil = max;
    console.log(this.options.ceil);

    return this.maxValue = max;
  }


  getMinPrice(arr: Array<number>): number {
    arr = this.productPrices
    let min = arr[0];
    for (let i = 1; i < arr.length; ++i) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    this.options.floor = min;
    console.log(this.options.floor);
    return this.minValue = min;
  }

  private getCoins(): void {
    this.prService.getJSONCoins().subscribe(
      data => {
        this.coins = data;
        for (const coin in this.coins) {
          const object = this.coins[coin];
          this.productPrices.push(object.price);
        }
        this.getMaxPrice(this.productPrices);
        this.getMinPrice(this.productPrices);
      })

  }





}
