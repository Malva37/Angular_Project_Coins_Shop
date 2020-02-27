import { Injectable } from '@angular/core';
import { Medal } from '../classes/medals.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MedalService {

  formData: Medal;

  constructor(private firestore: AngularFirestore) { }

  getMedals() {
    return this.firestore.collection('medals').snapshotChanges();
  }
}
