import { Component, OnInit } from '@angular/core';
import { ICoin } from 'src/app/shared/interfaces/coins.interfaces';
import { Options } from 'ng5-slider';
import { Coin } from 'src/app/shared/classes/coins.model';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { CoinService } from 'src/app/shared/services/coin.service';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  list: Coin[];
  buttonsShow: boolean;
  searchName: string;
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  newArticle: IArticle;
  count: number = 1;
  denomination: number;
  metal:string;
  series:string;
  year:number;




  constructor(private service: CoinService) { }

  ngOnInit() {
    this.service.getCoins().subscribe(actionArray => {
      this.list = actionArray.map(c => {
        return {
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        } as Coin;
      }); 
      this.getMinPrice(this.list);
      this.getMaxPrice(this.list);
    });
  }

  buyProduct(coin: Coin): void {
    const newItem: IProductOrder = new ProductOrder(coin.id, coin.categoryId, coin.name, coin.image, coin.price, this.count, coin.price);
    newItem.amount = this.count * coin.price;
    localStorage.setItem(coin.id, JSON.stringify(newItem));
  }

  getMaxPrice(list) {
    let max = list[0].price;
    for (let i = 1; i < list.length; ++i) {
      if (list[i].price > max) {
        max = list[i].price;
      }
    }
    this.options.ceil = max;
    this.maxValue = max;
  }


  getMinPrice(list) {
    let min = list[0].price;
    for (let i = 1; i < list.length; ++i) {
      if (list[i].price < min) {
        min = list[i].price;
      }
    }
    this.options.floor = min;
    this.minValue = min;
  }
}






