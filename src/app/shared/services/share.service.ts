import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  clickCnt: number;
  sumBasket: number;
  onClickNumber: EventEmitter<number> = new EventEmitter();
  onClickSum: EventEmitter<number> = new EventEmitter();
  onChangeSearchName: EventEmitter<string> = new EventEmitter();

  searchName: string;


  admin: boolean;
  user: boolean;
  anyOne: boolean;
  switchOnAdmin: EventEmitter<boolean> = new EventEmitter();
  switchOnUser: EventEmitter<boolean> = new EventEmitter();
  switchOnAny: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router) { }


  adminHere() {
    this.admin = true;
    this.switchOnAdmin.emit(this.admin);
    // this.switchOn();
  }

  userHere() {
    this.user = true;
    this.switchOnUser.emit(this.user);
    // this.switchOn();
  }

  anyHere() {
    this.anyOne = false;
    this.switchOnAny.emit(this.anyOne);

  }








  changeSearchName(search) {
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

