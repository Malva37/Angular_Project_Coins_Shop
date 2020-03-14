
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
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
  
  
    constructor(private modalService: BsModalService) { }
  
    ngOnInit() {
    }
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }


  }

