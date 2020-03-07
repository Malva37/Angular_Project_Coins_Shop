import { Injectable } from '@angular/core';
import { Order } from '../classes/orders.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  userRef: AngularFirestoreCollection<Order> = null;



  constructor(private firestore: AngularFirestore) {
    this.userRef = firestore.collection('orders')
  }

  getOrders() {
    return this.firestore.collection('orders').snapshotChanges();
  }


}
