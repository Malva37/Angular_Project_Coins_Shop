import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { BanknoteService } from 'src/app/shared/services/banknote.service';
import { Banknote } from 'src/app/shared/classes/banknotes.model';
import { ShareService } from 'src/app/shared/services/share.service';


@Component({
  selector: 'app-banknotes',
  templateUrl: './banknotes.component.html',
  styleUrls: ['./banknotes.component.scss']
})
export class BanknotesComponent implements OnInit {
  list: Banknote[];
  buttonsShow: boolean;
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  newArticle: IArticle;
  count: number = 1;
  signature:string;
  year:number;
  denomination:number;
  clickCnt: number = 0;
  sumBasket: number = 0;
  searchName: string;
  searchField: boolean;


  constructor(private service: BanknoteService, private share: ShareService) {
    this.share.onClickNumber.subscribe(cnt => this.clickCnt = cnt);
    this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
    this.share.onChangeSearchName.subscribe(keypress => this.searchName = keypress);
  }

  ngOnInit() {

    // this.service.getBanknotes().subscribe(actionArray => {
    //   this.list = actionArray.map(item => {
    //     return {
    //       id: item.payload.doc.id,
    //       ...item.payload.doc.data()
    //     } as Banknote;
    //   });
    //   this.getMinPrice(this.list);
    //   this.getMaxPrice(this.list);
    // });
  }


  // buyProduct(banknote: Banknote): void {
  //   const newItem: IProductOrder = new ProductOrder(banknote.id, banknote.categoryId, banknote.name, banknote.image, banknote.price, this.count, banknote.price);
  //   newItem.amount = this.count * banknote.price;
  //   let keys = Object.keys(localStorage)
  //   for (let i = 0; i < keys.length; i++) {
  //     const element = keys[i];
  //     if (banknote.id == element) {
  //       let localItem = JSON.parse(localStorage.getItem(element));
  //       localItem.count++;
  //       localItem.amount = localItem.count * localItem.price;
  //       localStorage.setItem(banknote.id, JSON.stringify(localItem));
  //       break
  //     }
  //   }
  //   localStorage.setItem(banknote.id, JSON.stringify(newItem));
  //   this.share.plusItem();

  // }

  // getMaxPrice(list) {
  //   let max = list[0].price;
  //   for (let i = 1; i < list.length; ++i) {
  //     if (list[i].price > max) {
  //       max = list[i].price;
  //     }
  //   }
  //   this.options.ceil = max;
  //   this.maxValue = max;
  // }


  // getMinPrice(list) {
  //   let min = list[0].price;
  //   for (let i = 1; i < list.length; ++i) {
  //     if (list[i].price < min) {
  //       min = list[i].price;
  //     }
  //   }
  //   this.options.floor = min;
  //   this.minValue = min;
  // }

}
