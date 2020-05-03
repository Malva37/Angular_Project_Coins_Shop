import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IImage } from '../interfaces/image.interfaces';
import { Observable } from 'rxjs';
import { ICoin } from '../interfaces/coins.interfaces';
import { IProduct } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  urlImages: string;
  httpHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    // this.urlImages = firestore.collection('coins');
    this.urlImages = `${environment.apiUrl}/admin/images`;
    this.httpHeader = new HttpHeaders().append(
      "Access-Control-Allow-Origin", environment.apiUrl)
  }

  postImage(product): Observable<IProduct> {
    // console.log();
    return this.http.post<IProduct>(this.urlImages, product)
  }

  deleteImage(id:number) {
    console.log(id);
    this.http.delete(`${this.urlImages}?id=${id}`)
  }




}
