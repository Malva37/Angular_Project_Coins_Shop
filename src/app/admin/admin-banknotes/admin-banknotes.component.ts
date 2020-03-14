
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-admin-banknotes',
  templateUrl: './admin-banknotes.component.html',
  styleUrls: ['./admin-banknotes.component.scss']
})
export class AdminBanknotesComponent implements OnInit {
  modalRef: BsModalRef;
  // arrBanknotes: Array<IBanknote> = [];
  // productCategoryName: string = 'banknotes';
  // productName: string;
  // productYear: number;
  // productDenomination: number;
  // productDescription: string;
  // productPrice: number;
  // productCategoryId: number = 2;
  // productId: number;
  // productSignature: string;
  // productImage: string;
  // editStatus: boolean;

  // ref: AngularFireStorageReference;
  // task: AngularFireUploadTask;
  // uploadState: Observable<string>;
  // uploadProgress: Observable<number>;
  // downloadURL: Observable<string>;
  // searchName: string;


  constructor(private modalService: BsModalService) { }

  ngOnInit() {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}