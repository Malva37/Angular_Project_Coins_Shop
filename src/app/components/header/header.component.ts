import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/shared/services/share.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { element } from 'protractor';


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
  checkSignOut: boolean;

  constructor(private share: ShareService,
    private autService: AuthService) {
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
    this.showSignOut();
  }

  showSignOut() {
        let admin = JSON.parse(localStorage.getItem('isAdmin'));
        if (admin) {
          this.logIn = true;
          this.adminIcon = true;
        } else if(admin === false){
          this.logIn = true;
          this.userIcon = true;
        } else if(admin === null){
          this.userIcon = false;
          this.adminIcon = false;
          this.logIn = false;

        }
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
