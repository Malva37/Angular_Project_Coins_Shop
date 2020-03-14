import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IAccessory } from 'src/app/shared/interfaces/accessories.interfaces';

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


  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }




}
