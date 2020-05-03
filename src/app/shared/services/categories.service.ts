import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/categories.interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
urlCateg:string;


  constructor(private http:HttpClient) {
    this.urlCateg = `${environment.apiUrl}/admin/categories`;
   }

   getCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.urlCateg)
  }




}
