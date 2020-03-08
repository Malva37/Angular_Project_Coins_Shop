import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from 'src/app/shared/classes/orders.model';
import { Product } from 'src/app/shared/classes/products.model';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  articles: Array<ProductOrder> = [];
  counter: number = 1;

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  emailUser: string;
  passwordUser: string;
  comment: string;
  totalSumOrder: number = 0;
  payment = "Приват Банк";
  delivery = "Нова пошта";




  constructor(private articleService: ArticleService,
    private service: OrderService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage, ) { }

  ngOnInit() {
    this.getArticles();
    this.resetForm();
  }

  getArticles() {

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


  resetForm(form?: NgForm) {
    console.log(form);
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null, // має сформувати firebase
      user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        comment: ''
      },
      items: [{
        id: '',
        categoryId: null,
        name: '',
        image: '',
        price: null,
        count: null,
        amount: null
      }
      ],
      totalSumOrder: null,
      payment: '',
      delivery: ''
    }
  }

  // statusCount(bool: boolean, item) {
  //   if (bool == true) {
  //     item.count++;
  //     let editItem = JSON.stringify(item)
  //     localStorage.setItem(item.id, editItem);
  //     this.getArticles()
  //   }
  //   else {
  //     item.count++;
  //     let editItem = JSON.stringify(item)
  //     localStorage.setItem(item.id, editItem);
  //     this.getArticles()
  //   }
  // }



  add(payment: NgForm, delivery: NgForm, form: NgForm) {
    console.log(payment.value);
    console.log(delivery.value);
    console.log(form.value);
    const data: Order = Object.assign({}, form.value);


  }
  // onSubmit(form: NgForm, payment: NgForm, delivery: NgForm) {
  //   console.log(form);

  //   const data: Order = Object.assign({}, form.value);
  //   // debugger
  //   delete data.id;
  //   if (form.value.id == null) {
  //     this.firestore.collection('orders').add(data);
  //   }
  //   this.resetForm(form);
  // }



  deleteItem(item: Product): void {
    console.log(item);
    localStorage.removeItem(item.id);
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].id == item.id) {
        this.articles.splice(i, 1);
        break;
      }
    }
  }




}
