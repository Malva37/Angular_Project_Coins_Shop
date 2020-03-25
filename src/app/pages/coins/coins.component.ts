import { Component, OnInit } from '@angular/core';
import { ICoin } from 'src/app/shared/interfaces/coins.interfaces';
import { Options } from 'ng5-slider';
import { Coin } from 'src/app/shared/classes/coins.model';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { CoinService } from 'src/app/shared/services/coin.service';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { ShareService } from 'src/app/shared/services/share.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  list: Coin[];
  buttonsShow: boolean;
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  newArticle: IArticle;
  count: number = 1;
  denomination: number;
  metal: string;
  series: string;
  year: number;
  clickCnt: number = 0;
  sumBasket: number = 0;
  searchName: string;
  searchField: boolean;




  constructor(private service: CoinService,
    private share: ShareService) {
    this.share.onClickNumber.subscribe(cnt => this.clickCnt = cnt);
    this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
    this.share.onChangeSearchName.subscribe(keypress => this.searchName = keypress);
  }

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
    debugger
    const newItem: IProductOrder = new ProductOrder(coin.id, coin.categoryId, coin.name, coin.image, coin.price, this.count, coin.price);
    newItem.amount = this.count * coin.price;
    let keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      if (coin.id == element) {
        let localItem = JSON.parse(localStorage.getItem(element));
        localItem.count++;
        localItem.amount = localItem.count * localItem.price;
        localStorage.setItem(coin.id, JSON.stringify(localItem));
        break
      }
      localStorage.setItem(coin.id, JSON.stringify(newItem));
    }
    this.share.plusItem();

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






