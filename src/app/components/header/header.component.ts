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

  constructor(private share: ShareService) {
    this.share.onClickNumber.subscribe(cnt => this.clickCount = cnt);
    this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
  }

  ngOnInit() {
    this.numberItemsInBasket();
    this.sumInBasket();
  }

  numberItemsInBasket() {
    let keys = Object.keys(localStorage);
    return this.clickCount = keys.length;
  }

  sumInBasket(){
    let keys = Object.keys(localStorage);
    let articles=[];
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
