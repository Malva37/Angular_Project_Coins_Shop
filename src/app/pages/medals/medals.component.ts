import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MedalService } from 'src/app/shared/services/medal.service';
import { Medal } from 'src/app/shared/classes/medals.model';
import { Options } from 'ng5-slider';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { IOrder } from 'src/app/shared/interfaces/orders.interfaces';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { ShareService } from 'src/app/shared/services/share.service';


@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.scss']
})
export class MedalsComponent implements OnInit {
  list: Medal[];
  buttonsShow: boolean;
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  newArticle: IArticle;
  count: number = 1;
  clickCnt: number = 0;
  sumBasket: number = 0;
  searchName: string;
  searchField: boolean;


  constructor(
    private service: MedalService,
    private share: ShareService) { 
      this.share.onClickNumber.subscribe(cnt => this.clickCnt = cnt);
      this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
      this.share.onChangeSearchName.subscribe(keypress => this.searchName = keypress);
     }


  ngOnInit() {
    this.service.getMedals().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Medal;
      });
      this.getMinPrice(this.list);
      this.getMaxPrice(this.list);
    });
  }

  buyProduct(medal: Medal): void {
    const newItem: IProductOrder = new ProductOrder(medal.id, medal.categoryId, medal.name, medal.image[1], medal.price, this.count, medal.price);
    newItem.amount = this.count * medal.price;
    let keys = Object.keys(localStorage)
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      if (medal.id == element) {
        let localItem = JSON.parse(localStorage.getItem(element));
        localItem.count++;
        localItem.amount = localItem.count * localItem.price;
        localStorage.setItem(medal.id, JSON.stringify(localItem));
        break
      }
    }
    localStorage.setItem(medal.id, JSON.stringify(newItem));
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


  // buyProduct(medal: Medal) {
  //   debugger
  //   const newA: IArticle = new Article(medal, 1, medal.price, medal.price);
  //   console.log(newA);
  //   return this.newArticle = newA;
  // }

}
