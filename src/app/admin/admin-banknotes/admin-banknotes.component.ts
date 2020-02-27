
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, finalize } from 'rxjs/operators';
import { IBanknote } from 'src/app/shared/interfaces/banknote.interfaces';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Banknote } from 'src/app/shared/classes/banknotes.model';
import { ProductsService } from 'src/app/shared/services/coins.service';

@Component({
  selector: 'app-admin-banknotes',
  templateUrl: './admin-banknotes.component.html',
  styleUrls: ['./admin-banknotes.component.scss']
})
export class AdminBanknotesComponent implements OnInit {
  modalRef: BsModalRef;
  arrBanknotes: Array<IBanknote> = [];
  productCategoryName: string = 'banknotes';
  productName: string;
  // productSeries: string;
  productYear: number;
  // productMetal: string;
  productDenomination: number;
  productDescription: string;
  productPrice: number;
  productCategoryId: number = 2;
  productId: number;
  productSignature: string;
  productImage: string;
  editStatus: boolean;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  searchName: string;


  constructor(private modalService: BsModalService,
    private prService: ProductsService,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    // this.getBanknotes();
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  // private getBanknotes(): void {
  //   this.prService.getJSONBanknotes().subscribe(
  //     data => {
  //       this.arrBanknotes = data;
  //     }
  //   )
  // }

  // addBanknotes(): void {
  //   let newB: IBanknote = new Banknote(1,
  //     this.productCategoryId,
  //     this.productCategoryName,
  //     this.productName,
  //     this.productYear,
  //     this.productDenomination,
  //     this.productSignature,
  //     this.productDescription,
  //     this.productPrice,
  //     this.productImage
  //   );
  //   if (this.arrBanknotes.length > 0) {
  //     newB.id = this.arrBanknotes.slice(-1)[0].id + 1;
  //     console.log(newB);
  //   }

  //   if (!this.editStatus) {
  //     this.prService.postJSONBanknotes(newB).subscribe(
  //       () => {
  //         this.getBanknotes();
  //       }
  //     );
  //   } else {
  //     newB.id = this.productId;
  //     this.prService.updateJSONBanknotes(newB).subscribe(
  //       () => { this.getBanknotes() }
  //     );
  //   }
  //   this.editStatus = false;
  //   this.resetForms();
  // }

  // resetForms() {
  //   this.productName = '';
  //   this.productYear = null;
  //   this.productSignature = '';
  //   this.productDenomination = null;
  //   this.productDescription = '';
  //   this.productPrice = null;
  //   this.productImage = '';
  // }

  // deleteBanknotes(banknote: IBanknote) {
  //   this.prService.deleteJSONBanknotes(banknote.id).subscribe(
  //     () => {
  //       this.getBanknotes();
  //     }
  //   )
  // }
  // editBanknotes(banknote: IBanknote, template: TemplateRef<any>) {
  //   console.log(banknote);
  //   this.modalRef = this.modalService.show(template);
  //   this.productName = banknote.name;
  //   this.productYear = banknote.year;
  //   this.productSignature = banknote.signature;
  //   this.productDenomination = banknote.denomination;
  //   this.productDescription = banknote.description;
  //   this.productPrice = banknote.price;
  //   this.productId = banknote.id;
  //   this.productImage = banknote.image;
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