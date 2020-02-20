
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/coins.service';
// import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
// import { Product } from 'src/app/shared/classes/products.model';
import { Medal } from 'src/app/shared/classes/medals.model';
import { IMedal } from 'src/app/shared/interfaces/medals.interfaces';

@Component({
  selector: 'app-admin-medals',
  templateUrl: './admin-medals.component.html',
  styleUrls: ['./admin-medals.component.scss']
})
export class AdminMedalsComponent implements OnInit {

    modalRef: BsModalRef;
    arrMedals: Array<IMedal> = [];
    productCategoryName: string = 'medals';
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategoryId: number = 3;
    productId: number;
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
      this.getMedals();
    }
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
  
    private getMedals(): void {
      this.prService.getJSONMedals().subscribe(
        data => {
          this.arrMedals = data;
        }
      )
    }
  
    addMedals(): void {
      let newM: IMedal = new Medal(1,
        this.productCategoryId,
        this.productCategoryName,
        this.productName,
        this.productDescription,
        this.productPrice,
        this.productImage
      );
      if (this.arrMedals.length > 0) {
        newM.id = this.arrMedals.slice(-1)[0].id + 1;
        console.log(newM);
      }
  
      if (!this.editStatus) {
        this.prService.postJSONMedals(newM).subscribe(
          () => {
            this.getMedals();
          }
        );
      } else {
        newM.id = this.productId;
        this.prService.updateJSONMedals(newM).subscribe(
          () => { this.getMedals() }
        );
      }
      this.editStatus = false;
      this.resetForms();
    }
  
    resetForms() {
      this.productName = '';
      this.productDescription = '';
      this.productPrice = null;
      this.productImage = '';
    }
  
    deleteMedals(medal: IMedal) {
      this.prService.deleteJSONMedals(medal.id).subscribe(
        () => {
          this.getMedals();
        }
      )
    }
    editMedals(medal: IMedal, template: TemplateRef<any>) {
      console.log(medal);
      this.modalRef = this.modalService.show(template);
      this.productName = medal.name;
      this.productDescription = medal.description;
      this.productPrice = medal.price;
      this.productId = medal.id;
      this.productImage = medal.image;
      this.editStatus = true;
    }
  
  
  
    public upload(event: any): void {
      console.log(event);
      const file = event.target.files[0];
      const filePath = `images/${this.createUUID()}.${file.type.split('/')[1]}`;
      this.task = this.afStorage.upload(filePath, file);
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges()
        .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
        .subscribe();
      this.task.then((e) => {
        this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(
          data => { this.productImage = data;}
        );
      }
      );
    }
  
    private createUUID(): string {
      let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // tslint:disable-next-line:no-bitwise
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        // tslint:disable-next-line:no-bitwise
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
  



  }

