import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICoin } from '../interfaces/coins.interfaces';
import { IProduct } from '../interfaces/products.interfaces';
import { IBanknote } from '../interfaces/banknote.interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    urlCoins: string;
    urlBanknotes: string;
    urlMedals: string;
    urlAccessories: string;

    constructor(private http: HttpClient) {
        this.urlCoins = 'http://localhost:3000/coins';
        this.urlBanknotes = 'http://localhost:3000/banknotes';
        this.urlMedals = 'http://localhost:3000/medals';
        this.urlAccessories = 'http://localhost:3000/accessories';

    }


    getJSONCoins(): Observable<Array<ICoin>> {
        return this.http.get<Array<ICoin>>(this.urlCoins)
    }
    getJSONBanknotes(): Observable<Array<IBanknote>> {
        return this.http.get<Array<IBanknote>>(this.urlBanknotes)
    }
    getJSONMedals(): Observable<Array<IProduct>> {
        return this.http.get<Array<IProduct>>(this.urlMedals)
    }
    getJSONAccessories(): Observable<Array<IProduct>> {
        return this.http.get<Array<IProduct>>(this.urlAccessories)
    }



    postJSONCoins(product: ICoin): Observable<Array<ICoin>> {
        return this.http.post<Array<ICoin>>(this.urlCoins, product)
    }
    postJSONBanknotes(product: IBanknote): Observable<Array<IBanknote>> {
        return this.http.post<Array<IBanknote>>(this.urlBanknotes, product)
    }
    postJSONMedals(product: IProduct): Observable<Array<IProduct>> {
        return this.http.post<Array<IProduct>>(this.urlMedals, product)
    }
    postJSONAccessories(product: IProduct): Observable<Array<IProduct>> {
        return this.http.post<Array<IProduct>>(this.urlAccessories, product)
    }




    updateJSONCoins(coin: ICoin): Observable<Array<IProduct>> {
        return this.http.put<Array<IProduct>>(`${this.urlCoins}/${coin.id}`, coin)
    }
    updateJSONBanknotes(banknote: IBanknote): Observable<Array<IBanknote>> {
        return this.http.put<Array<IBanknote>>(`${this.urlBanknotes}/${banknote.id}`, banknote)
    }
    updateJSONMedals(medal: ICoin): Observable<Array<IProduct>> {
        return this.http.put<Array<IProduct>>(`${this.urlMedals}/${medal.id}`, medal)
    }
    updateJSONAccessories(accessory: ICoin): Observable<Array<IProduct>> {
        return this.http.put<Array<IProduct>>(`${this.urlAccessories}/${accessory.id}`, accessory)
    }




    deleteJSONCoins(id: number): Observable<Array<ICoin>> {
        return this.http.delete<Array<ICoin>>(`${this.urlCoins}/${id}`)
    }
    deleteJSONBanknotes(id: number): Observable<Array<IBanknote>> {
        return this.http.delete<Array<IBanknote>>(`${this.urlBanknotes}/${id}`)
    }
    deleteJSONMedals(id: number): Observable<Array<IProduct>> {
        return this.http.delete<Array<IProduct>>(`${this.urlMedals}/${id}`)
    }
    deleteJSONAccessories(id: number): Observable<Array<IProduct>> {
        return this.http.delete<Array<IProduct>>(`${this.urlAccessories}/${id}`)
    }




}
