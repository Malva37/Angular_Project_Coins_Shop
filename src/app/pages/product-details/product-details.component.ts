import { Component, OnInit } from '@angular/core';
import { MedalService } from 'src/app/shared/services/medal.service';
import { ActivatedRoute } from '@angular/router';
import { Medal } from 'src/app/shared/classes/medals.model';
import { Location } from '@angular/common';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { NgForm } from '@angular/forms';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  count: number=1;
  articles: Array<ProductOrder> = [];


  constructor(private medalService: MedalService,
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.getData();
    // this.getArticles();

  }
  getData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.medalService.userRef.doc(id).valueChanges().subscribe(
      data => {
        this.product = data
      })
  }
  back(): void {
    this.location.back();
  }
  statusCount(bool: boolean) {
    if (bool == true) {
      this.count++;
      console.log(this.count);
      
    }
    else {this.count--;
    console.log(this.count);}
  }
  // private getArticles(): void {
  //   this.articleService.getJSONArticle().subscribe(
  //     data => {
  //       this.articles = data;
  //     }
  //   );
  // }
 
  buyProduct(medal: Medal): void {
    // let idLocal = (localStorage.length+1).toString();
    // idLocal.toString();
    const newItem: IProductOrder = new ProductOrder(medal.id, medal.categoryId, medal.name, medal.image, medal.price, this.count, medal.price);
    newItem.amount = this.count * medal.price;
    localStorage.setItem( medal.id, JSON.stringify(newItem));



    // const newA: IArticle = new Article(1, medal, this.counter, medal.price, medal.price);
    // newA.totalSum = this.counter * medal.price;
    // if (this.articles.length > 0) {
    //   newA.id = this.articles.slice(-1)[0].id + 1;
    //   this.articleService.postJSONArticle(newA).subscribe(
    //     () => {
    //       this.getArticles();
    //     })
    // } else {
    //   this.articleService.postJSONArticle(newA).subscribe(
    //     () => {
    //       this.getArticles();
    //     })
    // }
  }





}
