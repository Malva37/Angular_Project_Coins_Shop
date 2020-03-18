import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Banknote } from 'src/app/shared/classes/banknotes.model';
import { BanknoteService } from 'src/app/shared/services/banknote.service';


@Component({
  selector: 'app-banknote-list',
  templateUrl: './banknote-list.component.html',
  styleUrls: ['./banknote-list.component.scss']
})
export class BanknoteListComponent implements OnInit {

  list: Banknote[];
  categoryId: number;
  categoryName: string;
  name: string;
  counter: number;
  year:number;
  denomination:number;
  signature:string;
  description: string;
  price: number;
  image: string;
  downloadSrc: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  modalRef: BsModalRef;
  editImageStatus: boolean

  constructor(private service: BanknoteService,
    private modalService: BsModalService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.service.getBanknotes().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id, ...item.payload.doc.data()
        } as Banknote;
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
      categoryId: 2,
      categoryName: 'banknotes',
      name: '',
      counter: null,
      year: null,
      denomination: null,
      signature: '',
      description: '',
      price: null,
      image: ''
    };
  }

  onSubmit(form: NgForm) {
    const data: Banknote = Object.assign({}, form.value);
    this.firestore.doc('banknotes/' + form.value.id).update(data);
    this.resetForm(form);
  }

  
  onEdit(banknote: Banknote, template) {
    this.openModal(template);
    this.service.formData = Object.assign({}, banknote);
    this.editImageStatus = true;
  }



  public upload(event: any): void {
    debugger
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
          this.service.formData.image = data;
        });
    });
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

  public deleteImage(banknote: Banknote) {
    this.editImageStatus = false;
    this.afStorage.storage.refFromURL(banknote.image).delete();
    this.service.formData.image = ''
  }



}
