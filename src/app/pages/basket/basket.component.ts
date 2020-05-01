import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from 'src/app/shared/classes/orders.model';
import { Product } from 'src/app/shared/classes/products.model';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { ShareService } from 'src/app/shared/services/share.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  articles: Array<ProductOrder> = [];
  phoneMask = ['+', '3', '8', '(', '0', /\d{1}/, /\d{1}/, ')', /\d{1}/, /\d{1}/, /\d{1}/, '-', /\d{1}/, /\d{1}/, '-', /\d{1}/, /\d{1}/];
  counter: number = 1;
  idOrder: string;
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  items: Array<ProductOrder> = [];
  comment: string;
  totalSumOrder: number = 0;
  payment = "Приват Банк";
  delivery = "Нова пошта";
  personCount: number = 0;
  clickCnt: number = 0;
  sumBasket: number = 0;
  buttonDisabled: boolean;
  username = new FormControl();
  user: object = new Object();

  form01: FormGroup;



  constructor(
    private firestore: AngularFirestore,
    private share: ShareService,
    public builder: FormBuilder) {
    this.share.onClickNumber.subscribe(cnt => this.clickCnt = cnt);
    this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
    this.form01 = this.builder.group({
      idUser: [null],
      firstName: [null, [Validators.required, Validators.pattern('[A-Za-z\u0400-\u04FF][a-z\u0400-\u04FF]{1,19}')]],
      lastName: [null, [Validators.required, Validators.pattern('[A-Za-z\u0400-\u04FF][a-z\u0400-\u04FF]{1,19}')]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.pattern('[a-zA-Z\u0400-\u04FF0-9-.,/]+')]],
      email: [null, [Validators.required, Validators.pattern('[a-zA-Z0-9-.]+\@{1}[a-z.]+')]],
      comment: [null]
    });
  }

  // functionForm01() {
  //   this.results = [
  //     {
  //       "email": this.form01.controls.email.value
  //     },
  //     {
  //       "gender": this.form01.controls.gender.value
  //     }
  //   ]
  //   console.log(this.results);

  //   this.form01.reset();
  // }
  // constructor(public builder: FormBuilder) {
  //   this.form01 = this.builder.group({
  //     email: [null, Validators.required], //text
  //     DoB: [null, Validators.required], //radio button
  //     gender: [null, Validators.required], //date picker
  //   });
  // }


  ngOnInit() {
    this.getArticles();
  }


  getArticles() {
    this.articles = [];
    this.totalSumOrder = 0;
    let keys = Object.keys(localStorage);
    let i = 0;
    let key;
    for (; key = keys[i]; i++) {
      let item = JSON.parse(localStorage.getItem(key));
      this.articles.push(item);
      this.totalSumOrder += item.amount;
    }
    console.log(this.articles);
    return this.totalSumOrder;
  }


  statusCount(bool: boolean, item) {
    debugger
    console.log(item);
    if (bool) {
      item.count++;
      item.amount = item.count * item.price;
      let editItem = JSON.stringify(item);
      localStorage.setItem(item.id, editItem);
      console.log(editItem);
      this.getArticles();

    }
    else {
      item.count--;
      item.amount = item.count * item.price;
      let editItem = JSON.stringify(item);
      localStorage.setItem(item.id, editItem);
      console.log(editItem);
      this.getArticles();
    }
    this.share.plusItem();
  }
  paymentWay(event) {
    console.log(event.target.value);
    return this.payment = event.target.value;
  }

  deliveryWay(event) {
    console.log(event.target.value);
    return this.delivery = event.target.value;
  }




  addOrder(address, comment) {
    let keys = Object.keys(localStorage);
    let i = 0;
    let key;
    for (; key = keys[i]; i++) {
      let item = JSON.parse(localStorage.getItem(key));
      this.items.push(item);
    }


   
    this.user = {
          idUser: 1,
          firstName: this.form01.controls.firstName.value,
          lastName: this.form01.controls.lastName.value,
          email: this.form01.controls.email.value,
          phone: this.form01.controls.phone.value,
          address: this.form01.controls.address.value,
          comment: this.form01.controls.comment.value
        },
    console.log(this.user);
    console.log(address);
    console.log(comment);

    // const order: Order = Object.assign({}, {
    //   id: null,  // має сформувати firebase
    //   user: {
    //     idUser: 1,
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     phone: phone,
    //     address: address,
    //     comment: comment
    //   },
    //   items: this.items,
    //   totalSumOrder: this.totalSumOrder,
    //   payment: this.payment,
    //   delivery: this.delivery

    // })
    // delete order.id;
    // this.firestore.collection('orders').add(order);
    // alert('Ви зробили замовлення, очікуйте на зворотній звязок');
    localStorage.clear();
    this.resetForms();

  }
  resetForms() {
    this.articles = [];
    this.totalSumOrder = 0;
    this.idUser = null;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.comment = '';
  }


  // deleteItem(item: Product) {
  //   console.log(item);
  //   localStorage.removeItem(item.id);
  //   this.share.plusItem();
  //   for (let i = 0; i < this.articles.length; i++) {
  //     if (this.articles[i].id == item.id) {
  //       this.articles.splice(i, 1);
  //       break;
  //     }
  //   }
  //   return this.totalSumOrder - (item.counter * item.price);
  // }




}
