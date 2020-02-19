import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICoin } from '../interfaces/coins.interfaces';
import { IProduct } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/coins'
  }


  getJSONCoins(): Observable<Array<ICoin>> {
    return this.http.get<Array<ICoin>>(this.url)
  }

  postJSONCoins(product: ICoin ): Observable<Array<ICoin>> {
    return this.http.post<Array<ICoin>>(this.url, product)
  }

  deleteJSONCoins(id: number): Observable<Array<ICoin>> {
    return this.http.delete<Array<ICoin>>(`${this.url}/${id}`)
  }
  
updateJSONCoins(coin:ICoin):Observable<Array<IProduct>>{
  return this.http.put<Array<IProduct>>(`${this.url}/${coin.id}`,coin)
}


}
