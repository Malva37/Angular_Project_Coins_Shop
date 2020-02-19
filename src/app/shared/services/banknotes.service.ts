import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBanknote } from '../interfaces/banknote.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BanknotesService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/banknotes'
  }


  getJSONProducts(): Observable<Array<IBanknote>> {
    return this.http.get<Array<IBanknote>>(this.url)
  }

  postJSONProducts(product: IBanknote ): Observable<Array<IBanknote>> {
    return this.http.post<Array<IBanknote>>(this.url, product)
  }

  deleteJSONProducts(id: number): Observable<Array<IBanknote>> {
    return this.http.delete<Array<IBanknote>>(`${this.url}/${id}`)
  }


}
