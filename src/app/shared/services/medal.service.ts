import { Injectable } from '@angular/core';
import { Medal } from '../classes/medals.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';



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

  // getData(): void {
  //   const key = this.route.snapshot.paramMap.get('key');
  //   this.prService.usersRef.doc(key).valueChanges().subscribe(
  //     data => {
  //       this.data = data
  //       // console.log(data)
  //     })
  // }


  // getOneMedal(id: string): Observable<Medal[]> {
  //   const productsDocuments = this.firestore.collection<Medal[]>('medals');
  //   return productsDocuments.snapshotChanges()
  //     .pipe(
  //       map(changes => changes.map(({ payload: { doc } }) => {
  //         const data = doc.data();
  //         const id = doc.id
  //         return { id, ...data };
  //       })),
  //       map((medals) => medals.find(doc => doc.id === id)))
  // }



}
