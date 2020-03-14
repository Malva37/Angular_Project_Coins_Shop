import { Injectable } from '@angular/core';
import { Medal } from '../classes/medals.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class MedalService {

  formData: Medal;
  userRef: AngularFirestoreCollection<Medal> = null;


  constructor(private firestore: AngularFirestore) {
    this.userRef = firestore.collection('medals')
  }

  getMedals() {
    return this.firestore.collection('medals').snapshotChanges();

  }

}
