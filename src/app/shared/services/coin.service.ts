import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Coin } from '../classes/coins.model';

@Injectable({
    providedIn: 'root'
})
export class CoinService {

    formData: Coin;
    userRef: AngularFirestoreCollection<Coin> = null;


    constructor(private firestore: AngularFirestore) {
        this.userRef = firestore.collection('coins')
    }

    getCoins() {
        return this.firestore.collection('coins').snapshotChanges();
    }



}