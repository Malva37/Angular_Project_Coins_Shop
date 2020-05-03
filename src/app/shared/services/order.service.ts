import { Injectable } from '@angular/core';
import { Order } from '../classes/orders.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/orders.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  form: Order;
  userRef: AngularFirestoreCollection<Order> = null;

  urlOrders: string;

  constructor(private http: HttpClient) {
    this.urlOrders = 'http://localhost:3000/orders';
  }

  getJSONOrders(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.urlOrders)
  }

  postJSONOrders(order): Observable<Array<IOrder>> {
    return this.http.post<Array<IOrder>>(this.urlOrders, order)
  }
  deleteJSONOrders(id: number): Observable<Array<IOrder>> {
    return this.http.delete<Array<IOrder>>(`${this.urlOrders}/${id}`)
  }


}
