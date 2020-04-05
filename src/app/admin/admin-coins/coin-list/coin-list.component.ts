import { Component, OnInit, TemplateRef } from '@angular/core';
import { Coin } from 'src/app/shared/classes/coins.model';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { CoinService } from 'src/app/shared/services/coin.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  list: Coin[];
  categoryId: number;
  categoryName: string;
  name: string;
  counter: number;
  reserved: number;
  isAvailable: boolean;
  series: string;
  year: number;
  metal: string;
  denomination: number;
  description: string;
  price: number;
  image: string;
  imageReverse: string;
  downloadSrc: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  modalRef: BsModalRef;
  editImageStatus: boolean;
  editImageReverseStatus: boolean;
  
  refReverse: AngularFireStorageReference;
  taskReverse: AngularFireUploadTask;
  uploadStateReverse: Observable<string>;
  uploadProgressReverse: Observable<number>;
  downloadURLReverse: Observable<string>;



  constructor(private service: CoinService,
    private modalService: BsModalService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {

    this.service.getCoins().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id, ...item.payload.doc.data()
        } as Coin;
      });
    });
    this.resetForm();
  }



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      categoryId: 1,
      categoryName: 'coins',
      name: '',
      counter: null,
      reserved: null,
      isAvailable: true,
      series: '',
      year: null,
      metal: '',
      denomination: null,
      description: '',
      price: null,
      image: '',
      imageReverse: ''
    };
  }


  onEdit(coin: Coin, template) {
    debugger
    this.openModal(template);
    this.service.formData = Object.assign({}, coin);
    this.editImageStatus = true;
    this.editImageReverseStatus = true;
  }


  onSubmit(form: NgForm) {
    form.value.image = this.image;
    form.value.imageReverse = this.imageReverse;
    const data: Coin = Object.assign({}, form.value);
    this.firestore.doc('coins/' + form.value.id).update(data);
    this.resetForm(form);
  }

  onDelete(coin: Coin) {
    if (confirm('Are you sure to delete this medal?')) {
      this.firestore.doc('coins/' + coin.id).delete();
      this.afStorage.storage.refFromURL(coin.image).delete();
      this.afStorage.storage.refFromURL(coin.imageReverse).delete();
    }
  }



  public upload(event: any): void {
    debugger
    const file = event.target.files[0];
    const filePath = `images/coins/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/coins/${e.metadata.name}`).getDownloadURL().subscribe(
        data => {
          this.service.formData.image = data;
        });
    });
  }

  
  public uploadReverse(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/coins/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.taskReverse = this.afStorage.upload(filePath, file);
    this.uploadStateReverse = this.taskReverse.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgressReverse = this.taskReverse.percentageChanges();
    this.taskReverse.snapshotChanges()
      .pipe(finalize(() => this.downloadURLReverse = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.taskReverse.then((e) => {
      this.afStorage.ref(`images/coins/${e.metadata.name}`).getDownloadURL().subscribe(
        data => {
          this.imageReverse = data;
          console.log(data.downloadSrcReverse);
        }
      );
    }
    );
  }


  private createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  public deleteImage(coin: Coin) {
    this.editImageStatus = false;
    this.afStorage.storage.refFromURL(coin.image).delete();
    this.service.formData.image = ''
  }
  public deleteImageReverse(coin: Coin) {
    this.editImageReverseStatus = false;
    this.afStorage.storage.refFromURL(coin.imageReverse).delete();
    this.service.formData.imageReverse = ''
  }


}
