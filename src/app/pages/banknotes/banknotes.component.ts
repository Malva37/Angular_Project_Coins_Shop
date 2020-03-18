import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { BanknoteService } from 'src/app/shared/services/banknote.service';
import { Banknote } from 'src/app/shared/classes/banknotes.model';

@Component({
  selector: 'app-banknotes',
  templateUrl: './banknotes.component.html',
  styleUrls: ['./banknotes.component.scss']
})
export class BanknotesComponent implements OnInit {
  list: Banknote[];
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

  constructor(private service:BanknoteService) { }

  ngOnInit() {

    this.service.getBanknotes().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Banknote;
      });
      this.getMinPrice(this.list);
      this.getMaxPrice(this.list);
    });
  }

  
  buyProduct(banknote: Banknote): void {
    const newItem: IProductOrder = new ProductOrder(banknote.id, banknote.categoryId, banknote.name, banknote.image, banknote.price, this.count, banknote.price);
    newItem.amount = this.count * banknote.price;
    localStorage.setItem(banknote.id, JSON.stringify(newItem));
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