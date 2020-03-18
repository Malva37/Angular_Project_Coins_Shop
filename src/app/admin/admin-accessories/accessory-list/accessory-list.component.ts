import { Component, OnInit, TemplateRef } from '@angular/core';
import { Accessory } from 'src/app/shared/classes/accessories.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccessoryService } from 'src/app/shared/services/accessory.service';


@Component({
  selector: 'app-accessory-list',
  templateUrl: './accessory-list.component.html',
  styleUrls: ['./accessory-list.component.scss']
})
export class AccessoryListComponent implements OnInit {
  list: Accessory[];
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

  constructor(private service: AccessoryService,
    private modalService: BsModalService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.service.getAccessories().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id, ...item.payload.doc.data()
        } as Accessory;
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
      categoryId: 4,
      categoryName: 'accessories',
      name: '',
      counter: null,
      description: '',
      price: null,
      image: ''
    };
  }

  onEdit( accessory: Accessory, template) {
    debugger
    this.openModal(template);
    this.service.formData = Object.assign({}, accessory);
    this.editImageStatus = true;
  }


  onSubmit(form: NgForm) {
    const data: Accessory = Object.assign({}, form.value);
    this.firestore.doc('accessories/' + form.value.id).update(data);
    this.resetForm(form);
  }

  onDelete(accessory: Accessory) {
    if (confirm('Are you sure to delete this accessory?')) {
      this.firestore.doc('accessories/' + accessory.id).delete();
      this.afStorage.storage.refFromURL(accessory.image).delete();
    }
  }

  public upload(event: any): void {
    debugger
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

  public deleteImage(accessory: Accessory) {
    this.editImageStatus = false;
    this.afStorage.storage.refFromURL(accessory.image).delete();
    this.service.formData.image = ''
  }





}
