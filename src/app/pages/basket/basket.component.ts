import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/articles.interfaces';
import { Article } from 'src/app/shared/classes/articles.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/services/User.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  articles: Array<IArticle> = [];
  counter:number = 1;

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  emailUser: string;
  passwordUser: string;
  comment:string;


  constructor(private articleService: ArticleService,
    private service: UserServiceService) { }

  ngOnInit() {
    this.getArticles();
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: null,
      address: '',
      comment: ''
    };
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
