import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { AccessoryService } from 'src/app/shared/services/accessory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Accessory } from 'src/app/shared/classes/accessories.model';
import { map, finalize } from 'rxjs/operators';
import { IAccessory } from 'src/app/shared/interfaces/accessories.interfaces';


@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent implements OnInit {
  categoryId: number;
  categoryName: string;
  name: string;
  counter: number;
  reserved:number;
  isAvailable:boolean;
  description: string;
  price: number;
  image: string;
  downloadSrc: string;
  searchName: string;


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private service: AccessoryService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      categoryId: 4,
      categoryName: 'accessories',
      name: '',
      counter: null,
      reserved:null,
      isAvailable:true,
      description: '',
      price: null,
      image: ''
    };
  }
  onSubmit(form: NgForm) {
    const data: Accessory = Object.assign({}, form.value);
    debugger
    data.image =this.image;
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('accessories').add(data);
    } else {
      this.firestore.doc('accessories/' + form.value.id).update(data);
    }
    this.resetForm(form);
  }

  public upload(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/accessories/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/accessories/${e.metadata.name}`).getDownloadURL().subscribe(
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

  delete(downloadUrl) {
    return this.afStorage.storage.refFromURL(downloadUrl).delete();
  }



}
