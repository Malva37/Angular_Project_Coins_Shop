import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Options } from 'ng5-slider';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { IOrder } from 'src/app/shared/interfaces/orders.interfaces';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { Accessory } from 'src/app/shared/classes/accessories.model';
import { AccessoryService } from 'src/app/shared/services/accessory.service';
import { ShareService } from 'src/app/shared/services/share.service';



@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {
  list: Accessory[];
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
  clickCnt: number = 0;
  sumBasket: number = 0;

  constructor(private service: AccessoryService,
    private share: ShareService) { 
      this.share.onClickNumber.subscribe(cnt => this.clickCnt = cnt);
    this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
     }
  ngOnInit() {
    this.service.getAccessories().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Accessory;
      });
      this.getMinPrice(this.list);
      this.getMaxPrice(this.list);
    });
  }

  buyProduct(accessory: Accessory): void {
    const newItem: IProductOrder = new ProductOrder(accessory.id, accessory.categoryId, accessory.name, accessory.image, accessory.price, this.count, accessory.price);
    newItem.amount = this.count * accessory.price;
    localStorage.setItem(accessory.id, JSON.stringify(newItem));
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
