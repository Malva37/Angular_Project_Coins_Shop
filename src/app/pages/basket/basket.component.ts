import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  articles: Array<IArticle> = [];
  counter:number = 1;


  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getArticles();
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
  deleteArticle(product: IArticle): void {
    this.articleService.deleteJSONArticle(product.id).subscribe(
      () => {
        this.getArticles();
      }
    );
  }




}
