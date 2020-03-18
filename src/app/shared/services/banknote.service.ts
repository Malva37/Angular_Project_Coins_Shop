import { Injectable } from '@angular/core';
import { Banknote } from '../classes/banknotes.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BanknoteService {

  formData: Banknote;
    userRef: AngularFirestoreCollection<Banknote> = null;


    constructor(private firestore: AngularFirestore) {
        this.userRef = firestore.collection('banknotes')
    }

    getBanknotes() {
        return this.firestore.collection('banknotes').snapshotChanges();
    }

}
