import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MedalService } from 'src/app/shared/services/medal.service';
import { ActivatedRoute } from '@angular/router';
import { Medal } from 'src/app/shared/classes/medals.model';
import { Location } from '@angular/common';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { NgForm } from '@angular/forms';
import { IMedal } from 'src/app/shared/interfaces/medals.interfaces';
import { ArticleService } from 'src/app/shared/services/article.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  counter: number = 1;
  // newArticle: IArticle;
  articles: Array<IArticle> = [];
  // @Output() status = new EventEmitter<boolean>;


  constructor(private medalService: MedalService,
    private route: ActivatedRoute,
    private location: Location,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.getData();
    this.getArticles();
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
  private getArticles(): void {
    this.articleService.getJSONArticle().subscribe(
      data => {
        this.articles = data;
      }
    );
  }
  buyProduct(medal: Medal): void {
    const newA: IArticle = new Article(1, medal, this.counter, medal.price, medal.price);
    newA.totalSum = this.counter * medal.price;
    if (this.articles.length > 0) {
      newA.id = this.articles.slice(-1)[0].id + 1;
    } else {
      this.articleService.postJSONArticle(newA).subscribe(
        () => {
          this.getArticles();
        })
    }
    console.log(newA.id);
  }





}
