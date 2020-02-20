import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/coins.service';
import { IAccessory } from 'src/app/shared/interfaces/accessories.interfaces';
import { Accessory } from 'src/app/shared/classes/accessories.model';


@Component({
  selector: 'app-admin-accessories',
  templateUrl: './admin-accessories.component.html',
  styleUrls: ['./admin-accessories.component.scss']
})
export class AdminAccessoriesComponent implements OnInit {


  modalRef: BsModalRef;
  arrAccessories: Array<IAccessory> = [];
  productCategoryName: string = 'accessories';
  productName: string;
  productDescription: string;
  productPrice: number;
  productCategoryId: number = 4;
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
    this.getAccessories();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private getAccessories(): void {
    this.prService.getJSONAccessories().subscribe(
      data => {
        this.arrAccessories = data;
      }
    )
  }

  addAccessories(): void {
    let newA: IAccessory = new Accessory(1,
      this.productCategoryId,
      this.productCategoryName,
      this.productName,
      this.productDescription,
      this.productPrice,
      this.productImage
    );
    if (this.arrAccessories.length > 0) {
      newA.id = this.arrAccessories.slice(-1)[0].id + 1;
      console.log(newA);
    }

    if (!this.editStatus) {
      this.prService.postJSONAccessories(newA).subscribe(
        () => {
          this.getAccessories();
        }
      );
    } else {
      newA.id = this.productId;
      this.prService.updateJSONAccessories(newA).subscribe(
        () => { 
          this.getAccessories();
        }
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

  deleteAccessories(accessory: IAccessory) {
    this.prService.deleteJSONAccessories(accessory.id).subscribe(
      () => {
        this.getAccessories();
      }
    )
  }
  editAccessories(accessory: IAccessory, template: TemplateRef<any>) {
    console.log(accessory);
    this.modalRef = this.modalService.show(template);
    this.productName = accessory.name;
    this.productDescription = accessory.description;
    this.productPrice = accessory.price;
    this.productId = accessory.id;
    this.productImage = accessory.image;
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
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(data => {
        this.productImage = data;
      });
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
