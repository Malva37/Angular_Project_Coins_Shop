import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/shared/services/share.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  clickCount: number;
  sumBasket: number;
  searchName: string
  adminIcon: boolean;
  userIcon: boolean;
  logIn: boolean;

  constructor(private share: ShareService) {
    this.share.onClickNumber.subscribe(cnt => this.clickCount = cnt);
    this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
    this.share.onChangeSearchName.subscribe(keypress => this.searchName = keypress);
    this.share.switchOnAdmin.subscribe(status => this.adminIcon = status);
    this.share.switchOnUser.subscribe(status => this.userIcon = status);
    this.share.switchOnAny.subscribe(status => this.logIn = status);
  }


  valuechange(newValue) {
    this.share.changeSearchName(newValue);
  }

  ngOnInit() {
    this.numberItemsInBasket();
    this.sumInBasket();
  }


  logOut() {
    this.adminIcon = false;
    this.userIcon = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.logIn = false;

  }

  numberItemsInBasket() {
    let keys = Object.keys(localStorage);
    return this.clickCount = keys.length;
  }

  sumInBasket() {
    let keys = Object.keys(localStorage);
    let articles = [];
    this.sumBasket = 0;
    // let i = 0;
    // let key;
    // for (; key = keys[i]; i++) {
    //   let item = JSON.parse(localStorage.getItem(key));
    //   articles.push(item);
    //   this.sumBasket += item.amount;
    // }
    return this.sumBasket;
  }

}
