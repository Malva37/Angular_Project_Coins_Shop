import { Injectable } from '@angular/core';
import { Accessory } from '../classes/accessories.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
  formData: Accessory;
  userRef: AngularFirestoreCollection<Accessory> = null;


  constructor(private firestore: AngularFirestore) {
      this.userRef = firestore.collection('accessories')
  }

  getAccessories() {
      return this.firestore.collection('accessories').snapshotChanges();
  }

}