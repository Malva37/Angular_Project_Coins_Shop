import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from 'src/app/shared/classes/orders.model';
import { Product } from 'src/app/shared/classes/products.model';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { ShareService } from 'src/app/shared/services/share.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  articles: Array<ProductOrder> = [];
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


  constructor(
    private firestore: AngularFirestore,
    private share: ShareService) { 
      this.share.onClickNumber.subscribe(cnt => this.clickCnt = cnt);
      this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
     }
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




  addOrder(firstName, lastName, email, phone, address, comment) {
    let keys = Object.keys(localStorage);
    let i = 0;
    let key;
    for (; key = keys[i]; i++) {
      let item = JSON.parse(localStorage.getItem(key));
      this.items.push(item);
    }
    const order: Order = Object.assign({}, {
      id: null,  // має сформувати firebase
      user: {
        idUser: 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        comment: comment
      },
      items: this.items,
      totalSumOrder: this.totalSumOrder,
      payment: this.payment,
      delivery: this.delivery

    })
    delete order.id;
    this.firestore.collection('orders').add(order);
    alert('Ви зробили замовлення, очікуйте на зворотній звязок');
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


  deleteItem(item: Product) {
    console.log(item);
    localStorage.removeItem(item.id);
    this.share.plusItem();
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].id == item.id) {
        this.articles.splice(i, 1);
        break;
      }
    }
    return this.totalSumOrder - (item.counter * item.price);
  }

// getCity(name:string){
//   this.
// }


}
