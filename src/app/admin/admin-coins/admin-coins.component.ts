import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { ICoin } from 'src/app/shared/interfaces/coins.interfaces';
import { Coin } from 'src/app/shared/classes/coins.model';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/coins.service';
// import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-admin-coins',
  templateUrl: './admin-coins.component.html',
  styleUrls: ['./admin-coins.component.scss']
})
export class AdminCoinsComponent implements OnInit {
  modalRef: BsModalRef;
  arrCoins: Array<ICoin> = [];
  productCategoryName: string = 'coins';
  productName: string;
  productSeries: string;
  productYear: number;
  productMetal: string;
  productDenomination: number;
  productDescription: string;
  productPrice: number;
  productCategoryId: number = 1;
  productId: number;
  productImage: string;
  editStatus: boolean;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  searchName: string;




  constructor(private prService: ProductsService,
    private modalService: BsModalService,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    // this.getCoins();
  }


  // private getCoins(): void {
  //   this.prService.getJSONCoins().subscribe(
  //     data => {
  //       this.arrCoins = data;
  //     }
  //   );
  // }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }


  // addCoins(): void {
  //   const newC: ICoin = new Coin(1,
  //     this.productCategoryId,
  //     this.productCategoryName,
  //     this.productName,
  //     this.productSeries,
  //     this.productYear,
  //     this.productMetal,
  //     this.productDenomination,
  //     this.productDescription,
  //     this.productPrice,
  //     this.productImage);
  //   console.log(newC);
  //   if (this.arrCoins.length > 0) {
  //     newC.id = this.arrCoins.slice(-1)[0].id + 1;
  //   }

  //   if (!this.editStatus) {
  //     this.prService.postJSONCoins(newC).subscribe(
  //       () => {
  //         this.getCoins();
  //       }
  //     );
  //   } else {
  //     newC.id = this.productId;
  //     this.prService.updateJSONCoins(newC).subscribe(
  //       () => { this.getCoins() }
  //     );
  //   }
  //   this.editStatus = false;
  //   this.resetForms();
  // }

  // resetForms() {
  //   this.productName = '';
  //   this.productSeries = '';
  //   this.productYear = null;
  //   this.productMetal = '';
  //   this.productDenomination = null;
  //   this.productDescription = '';
  //   this.productPrice = null;
  //   this.productImage = '';
  // }

  // deleteCoins(coin: ICoin) :void{
  //   console.log(coin.id);
    
  //   this.prService.deleteJSONCoins(coin.id).subscribe(
  //     () => {
  //       this.getCoins();
  //     }
  //   )
  // }
  // editCoins(coin: ICoin, template: TemplateRef<any>) {
  //   console.log(coin);
  //   this.modalRef = this.modalService.show(template);
  //   this.productName = coin.name;
  //   this.productSeries = coin.series;
  //   this.productYear = coin.year;
  //   this.productMetal = coin.metal;
  //   this.productDenomination = coin.denomination;
  //   this.productDescription = coin.description;
  //   this.productPrice = coin.price;
  //   this.productId = coin.id;
  //   this.productImage = coin.image;
  //   this.editStatus = true;
  // }


  // public upload(event: any): void {
  //   console.log(event);
  //   const file = event.target.files[0];
  //   const filePath = `images/${this.createUUID()}.${file.type.split('/')[1]}`;
  //   this.task = this.afStorage.upload(filePath, file);
  //   this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
  //   this.uploadProgress = this.task.percentageChanges();
  //   this.task.snapshotChanges()
  //     .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
  //     .subscribe();
  //   this.task.then((e) => {
  //     this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(data => {
  //       this.productImage = data;
  //     });
  //   }
  //   );
  // }

  // private createUUID(): string {
  //   let dt = new Date().getTime();
  //   const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  //     // tslint:disable-next-line:no-bitwise
  //     const r = (dt + Math.random() * 16) % 16 | 0;
  //     dt = Math.floor(dt / 16);
  //     // tslint:disable-next-line:no-bitwise
  //     return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // }





}
