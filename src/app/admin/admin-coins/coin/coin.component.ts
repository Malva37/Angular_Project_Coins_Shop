import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { CoinService } from 'src/app/shared/services/coin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Coin } from 'src/app/shared/classes/coins.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {
  categoryName: string;
  name: string;
  series: string;
  year: number;
  metal: string;
  denomination: number;
  description: string;
  reserved:number;
  isAvailable:boolean;
  price: number;
  categoryId: number = 1;
  // productId: number;
  image: Array<string>;



  // nameInput:string;
  // orderForm: FormGroup;
  // items: FormArray;
  

  // imageReverse:string;
  // modalRef: BsModalRef;


  // ref: AngularFireStorageReference;
  // task: AngularFireUploadTask;
  // uploadState: Observable<string>;
  // uploadProgress: Observable<number>;
  // downloadURL: Observable<string>;

  // refReverse: AngularFireStorageReference;
  // taskReverse: AngularFireUploadTask;
  // uploadStateReverse: Observable<string>;
  // uploadProgressReverse: Observable<number>;
  // downloadURLReverse: Observable<string>;


  constructor(private service: CoinService,
    private modalService: BsModalService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder ) { }

  ngOnInit() {
    // this.resetForm();
    // this.orderForm = this.formBuilder.group({
    //   customerName: '',
    //   email: '',
    //   items: this.formBuilder.array([ this.createItem() ])
    // });
  }



  addItem(event){
    const file = event.target.files[0];
    console.log(file);
    

  }
  // addItem(): void {
  //   this.items = this.orderForm.get('items') as FormArray;
  //   this.items.push(this.createItem());
  // }

  // createItem(): FormGroup {
  //   return this.formBuilder.group({
  //     name: '',
  //     description: '',
  //     price: ''
  //   });
  // }


  // resetForm(form?: NgForm) {
  //   if (form != null) {
  //     form.resetForm();
  //   }
  //   this.service.formData = {
  //     id: null,
  //     categoryId: 1,
  //     categoryName: 'coins',
  //     name: '',
  //     counter: null,
  //     reserved:null,
  //     isAvailable: true,
  //     series: '',
  //     year: null,
  //     metal: '',
  //     denomination: null,
  //     description: '',
  //     price: null,
  //     image: ['']
  //     // imageReverse:''
  //   }
  // }


  // onSubmit(form: NgForm) {
  //   debugger
  //   form.value.image = this.image;
  //   form.value.imageReverse = this.imageReverse;
  //   form.value.isAvailable = form.value.counter > 0;
  //   const data: Coin = Object.assign({}, form.value);
  //   debugger
  //   delete data.id;
  //   // if (form.value.id == null) {
    
  //   //   this.firestore.collection('coins').add(data);
  //   // } else {
  //   //   this.firestore.doc('coins/' + form.value.id).update(data);
  //   // }
  //   this.resetForm(form);
  //   this.modalService._hideModal(1);
  // }



  // delete(downloadUrl) {
  //   return this.afStorage.storage.refFromURL(downloadUrl).delete();
  // }

  
  // public upload(event: any): void {
  //   const file = event.target.files[0];
  //   const filePath = `images/coins/${this.createUUID()}.${file.type.split('/')[1]}`;
  //   this.task = this.afStorage.upload(filePath, file);
  //   this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
  //   this.uploadProgress = this.task.percentageChanges();
  //   this.task.snapshotChanges()
  //     .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
  //     .subscribe();
  //   this.task.then((e) => {
  //     this.afStorage.ref(`images/coins/${e.metadata.name}`).getDownloadURL().subscribe(
  //       data => {
  //         this.image = data;
  //         console.log(data.downloadSrc);

  //       }
  //     );
  //   }
  //   );
  // }

  // public uploadReverse(event: any): void {
  //   const file = event.target.files[0];
  //   const filePath = `images/coins/${this.createUUID()}.${file.type.split('/')[1]}`;
  //   this.taskReverse = this.afStorage.upload(filePath, file);
  //   this.uploadStateReverse = this.taskReverse.snapshotChanges().pipe(map(s => s.state));
  //   this.uploadProgressReverse = this.taskReverse.percentageChanges();
  //   this.taskReverse.snapshotChanges()
  //     .pipe(finalize(() => this.downloadURLReverse = this.afStorage.ref(filePath).getDownloadURL()))
  //     .subscribe();
  //   this.taskReverse.then((e) => {
  //     this.afStorage.ref(`images/coins/${e.metadata.name}`).getDownloadURL().subscribe(
  //       data => {
  //         this.imageReverse = data;
  //         console.log(data.downloadSrcReverse);
  //       }
  //     );
  //   }
  //   );
  // }



  // private createUUID(): string {
  //   let dt = new Date().getTime();
  //   const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  //     const r = (dt + Math.random() * 16) % 16 | 0;
  //     dt = Math.floor(dt / 16);
  //     return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  //   });
  //   return uuid;
  // }




}
