import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  clickCnt: number;
  sumBasket: number;
  onClickNumber: EventEmitter<number> = new EventEmitter();
  onClickSum: EventEmitter<number> = new EventEmitter();
  onChangeSearchName: EventEmitter<string> = new EventEmitter();

searchName:string;

changeSearchName(search){
  this.onChangeSearchName.emit(search)
}

  numberItemsInBasket() {
    let keys = Object.keys(localStorage);
    return this.clickCnt = keys.length;
  }

  public plusItem() {
    this.numberItemsInBasket();
    this.sumInBasket();
    this.onClickNumber.emit(this.clickCnt);
    this.onClickSum.emit(this.sumBasket);
  }


  sumInBasket() {
    let keys = Object.keys(localStorage);
    let articles = [];
    this.sumBasket = 0;
    let i = 0;
    let key;
    for (; key = keys[i]; i++) {
      let item = JSON.parse(localStorage.getItem(key));
      articles.push(item);
      this.sumBasket += item.amount;
    }
    return this.sumBasket;
  }

}
