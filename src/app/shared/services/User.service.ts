import { Injectable } from '@angular/core';
import { User } from '../classes/users.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  formData: User;
  userRef: AngularFirestoreCollection<User> = null;



  constructor(private firestore: AngularFirestore) {
    this.userRef = firestore.collection('users')
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  
}
