import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/categories.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
urlCateg:string;


  constructor(private http:HttpClient) {
    this.urlCateg ='http://localhost:3000/categories'
   }

   getJSONCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.urlCateg)
  }

  postJSONCategories(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.urlCateg, category)
  }

  deleteJSONCategories(id: number): Observable<Array<ICategory>> {
    return this.http.delete<Array<ICategory>>(`${this.urlCateg}/${id}`)
  }




}
