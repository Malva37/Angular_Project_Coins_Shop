import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { BanknoteService } from 'src/app/shared/services/banknote.service';
import { Banknote } from 'src/app/shared/classes/banknotes.model';

@Component({
  selector: 'app-banknote',
  templateUrl: './banknote.component.html',
  styleUrls: ['./banknote.component.scss']
})
export class BanknoteComponent implements OnInit {
  categoryName: string;
  name: string;
  signature: string;
  year: number;
  denomination: number;
  description: string;
  price: number;
  reserved:number;
  isAvailable:boolean;
  categoryId: number;
  // productId: number;
  image: string;


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private service: BanknoteService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage ) { }

  ngOnInit() {
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      categoryId: 2,
      categoryName: 'banknotes',
      name: '',
      counter: null,
      reserved:null,
      isAvailable:true,
      year: null,
      denomination: null,
      signature: '',
      description: '',
      price: null,
      image: ''
    };
  }


  onSubmit(form: NgForm) {
    debugger
    form.value.image = this.image;
    // delete form.value.downloadSrc;
    const data: Banknote = Object.assign({}, form.value);
    debugger
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('banknotes').add(data);
    } else {
      this.firestore.doc('banknotes/' + form.value.id).update(data);
    }
    this.resetForm(form);
  }




  delete(downloadUrl) {
    return this.afStorage.storage.refFromURL(downloadUrl).delete();
  }

  
  public upload(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/banknotes/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/banknotes/${e.metadata.name}`).getDownloadURL().subscribe(
        data => {
          this.image = data;
          console.log(data.downloadSrc);

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



}
