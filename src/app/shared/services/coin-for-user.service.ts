import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Coin } from '../classes/coins.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICoin } from '../interfaces/coins.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoinForUserService {
    userRef: AngularFirestoreCollection<Coin> = null;
    urlCoins: string;
    httpHeader: HttpHeaders

    constructor(private firestore: AngularFirestore,
        private http: HttpClient) {
        this.userRef = firestore.collection('coins');
        this.urlCoins = `${environment.apiUrl}/coins`;
        this.httpHeader = new HttpHeaders().append(
            "Access-Control-Allow-Origin", environment.apiUrl
        )
    }

    getOneCoin(id: number): Observable<ICoin> {
        return this.http.get<ICoin>(`${this.urlCoins}?id=${id}`)

    }

    getCoins(): Observable <Array<ICoin>> {
        return this.http.get<Array<ICoin>>(this.urlCoins)
    }



}
