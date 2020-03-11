import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Order } from 'src/app/shared/classes/orders.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  list: Order[];
  price: number;
  image: string;
  name: string;


  constructor(    private service: OrderService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {

    this.service.getOrders().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id, ...item.payload.doc.data()
        } as Order;
      });
    });
    // this.resetForm();
  }

  onDelete(order: Order) {
    if (confirm('Are you sure to delete this order?')) {
      this.firestore.doc('orders/' + order.id).delete();
      // this.afStorage.storage.refFromURL(medal.image).delete();
    }
  }



}
