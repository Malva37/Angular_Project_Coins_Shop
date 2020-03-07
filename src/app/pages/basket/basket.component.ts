import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from 'src/app/shared/classes/orders.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  articles: Array<IArticle> = [];
  counter: number = 1;

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  emailUser: string;
  passwordUser: string;
  comment: string;
  totalSumOrder: number;




  constructor(private articleService: ArticleService,
    private service: OrderService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage, ) { }

  ngOnInit() {
    this.getArticles();
    this.resetForm();
  }

  getArticles() {
    let archive = [],
      keys = Object.keys(localStorage),
      i = 0, key;
    for (; key = keys[i]; i++) {
      let item = JSON.parse(localStorage.getItem(key));
      archive.push(item);
    }
     this.articles = archive;
     console.log(this.articles);
     
    return this.articles = archive;
  }


  resetForm(form?: NgForm ) {
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
        phone: null,
        address: '',
        password: '',
        comment: ''
      },
      article: [{
        id: null,
        article: {
          id: '',
          categoryId: null,
          categoryName: '',
          name: '',
          counter: null,
          description: '',
          price: null,
          image: null
        },
        counter: null,
        currentPrice: null,
        totalSum: null,
      }
      ],
      totalSumOrder: null,
      payment: '',
      delivery: ''
    }
  }

  onSubmit(form: NgForm) {
   console.log(form);
   
    // form.value.image = this.image;
    // delete form.value.downloadSrc;
    const data: Order = Object.assign({}, form.value);
    debugger
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('orders').add(data);
    } 
    this.resetForm(form);
  }



  // statusCounter(bool: boolean) {
  //   if (bool == true) {
  //     this.counter++
  //   }
  //   else this.counter--
  // }

  // private getArticles(): void {
  //   this.articleService.getJSONArticle().subscribe(
  //     data => {
  //       this.articles = data;
  //     }
  //   );
  // }
  // deleteArticle(product: Article): void {
  //   this.articleService.deleteJSONArticle(product.id).subscribe(
  //     () => {
  //       this.getArticles();
  //     }
  //   );
  // }




}
