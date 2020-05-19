import { Injectable } from '@angular/core';
import { Banknote } from '../classes/banknotes.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IBanknote } from '../interfaces/banknote.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanknoteService {

  formData: Banknote;
  userRef: AngularFirestoreCollection<Banknote> = null;
  urlBanknotes: string;
  httpHeader: HttpHeaders;

  constructor(private firestore: AngularFirestore,
      private http: HttpClient) {
      this.userRef = firestore.collection('banknote');
      this.urlBanknotes = `${environment.apiUrl}/admin/banknote`;
      this.httpHeader = new HttpHeaders().append(
          "Access-Control-Allow-Origin", environment.apiUrl
      )
  }

  getOneBanknote(id: number): Observable<IBanknote> {
      return this.http.get<IBanknote>(`${this.urlBanknotes}?id=${id}`)

  }

  getBanknotes(): Observable<Array<IBanknote>> {
      return this.http.get<Array<IBanknote>>(this.urlBanknotes)
  }


  postJSONBanknote(product: IBanknote): Observable<Array<IBanknote>> {
      return this.http.post<Array<IBanknote>>(this.urlBanknotes, product)
  }


  updateBanknote(product: IBanknote): Observable<IBanknote> {
      return this.http.put<IBanknote>(this.urlBanknotes, product);
  }

  deleteBanknote(id: number): Observable<void> {
      console.log("delete coin: " + id);
      let url = `${this.urlBanknotes}?id=${id}`;
      console.log(url);

     return this.http.delete<void>(url);
      console.log('after delete');
      
  }





}
