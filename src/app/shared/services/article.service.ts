import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
private url:string;
  constructor(private http:HttpClient) { 
    this.url = 'http://localhost:3000/article';
  }


  getJSONArticle():Observable<Array<any>>{
    return this.http.get<Array<any>>(this.url)
  }
  

  postJSONArticle(product: any): Observable<Array<any>> {
    return this.http.post<Array<any>>(this.url, product);
   }

  deleteJSONArticle(id:number):Observable<Array<any>>{
    return this.http.delete<Array<any>>(`${this.url}/${id}`)
  }




}
