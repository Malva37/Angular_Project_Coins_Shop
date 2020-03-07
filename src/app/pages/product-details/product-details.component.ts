import { Component, OnInit } from '@angular/core';
import { MedalService } from 'src/app/shared/services/medal.service';
import { ActivatedRoute } from '@angular/router';
import { Medal } from 'src/app/shared/classes/medals.model';
import { Location } from '@angular/common';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { NgForm } from '@angular/forms';
import { ArticleService } from 'src/app/shared/services/article.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  counter: number;
  articles: Array<IArticle> = [];


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
  statusCounter(bool: boolean) {
    if (bool == true) {
      this.counter++
    }
    else this.counter--
  }
  // private getArticles(): void {
  //   this.articleService.getJSONArticle().subscribe(
  //     data => {
  //       this.articles = data;
  //     }
  //   );
  // }
 
  buyProduct(medal: Medal): void {
    let idLocal = localStorage.length+1;
    const newA: IArticle = new Article(idLocal, medal, this.counter, medal.price, medal.price);
    newA.totalSum = this.counter * medal.price;
    localStorage.setItem(`article: ${idLocal}`, JSON.stringify(newA));



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
