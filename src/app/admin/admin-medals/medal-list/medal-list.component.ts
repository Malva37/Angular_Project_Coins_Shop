import { Component, OnInit, TemplateRef } from '@angular/core';
import { Medal } from 'src/app/shared/classes/medals.model';
import { MedalService } from 'src/app/shared/services/medal.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMedal } from 'src/app/shared/interfaces/medals.interfaces';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-medal-list',
  templateUrl: './medal-list.component.html',
  styleUrls: ['./medal-list.component.scss']
})
export class MedalListComponent implements OnInit {
  list: Medal[];
  categoryId: number;
  categoryName: string;
  name: string;
  counter: number;
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

  constructor(private service: MedalService,
    private modalService: BsModalService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.service.getMedals().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id, ...item.payload.doc.data()
        } as Medal;
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
      categoryId: 3,
      categoryName: 'medals',
      name: '',
      counter: null,
      description: '',
      price: null,
      image: ''
    };
  }

  onEdit(medal: Medal, template) {
    debugger
    this.openModal(template);
    this.service.formData = Object.assign({}, medal);
    this.editImageStatus = true;
  }


  onSubmit(form: NgForm) {
    const data: Medal = Object.assign({}, form.value);
    this.firestore.doc('medals/' + form.value.id).update(data);
    this.resetForm(form);
  }

  onDelete(medal: Medal) {
    if (confirm('Are you sure to delete this medal?')) {
      this.firestore.doc('medals/' + medal.id).delete();
      this.afStorage.storage.refFromURL(medal.image).delete();
    }
  }



  public upload(event: any): void {
    debugger
    const file = event.target.files[0];
    const filePath = `images/medals/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/medals/${e.metadata.name}`).getDownloadURL().subscribe(
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

  public deleteImage(medal: Medal) {
    this.editImageStatus = false;
    this.afStorage.storage.refFromURL(medal.image).delete();
    this.service.formData.image = ''
  }



}
