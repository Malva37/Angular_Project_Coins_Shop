// import { Component, OnInit, TemplateRef } from '@angular/core';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Coin } from 'src/app/shared/classes/coins.model';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, finalize } from 'rxjs/operators';
import { NgForm, FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { CoinService } from 'src/app/shared/services/coin-for-admin.service';
import { ICoin } from 'src/app/shared/interfaces/coins.interfaces';
import 'rxjs/add/operator/map'
import { element } from 'protractor';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/categories.interfaces';


@Component({
  selector: 'app-admin-coins',
  templateUrl: './admin-coins.component.html',
  styleUrls: ['./admin-coins.component.scss']
})
export class AdminCoinsComponent implements OnInit {
  modalRef: BsModalRef;
  formData: Coin;
  list: Array<ICoin>;
  adminCategories:Array<ICategory>;
  page: number;
  id: number;
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
  images: Array<string> = [];
  // imageReverse: string;
  downloadSrc: string;
  // product: ICoin;
  // oneImage:string;
  isArrayImages: boolean;
  // product;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  editImageStatus: boolean;
  editImageReverseStatus: boolean;


  constructor(private modalService: BsModalService,
    private service: CoinService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private categoryService:CategoriesService) { }

  ngOnInit() {

    this.getForAdmin();
    this.getCategory();
    // this.service.getCoins().subscribe(actionArray => {
    //   this.list = actionArray.map(item => {
    //     const data = item.payload.doc.data() as Coin;
    //     const id = item.payload.doc.id;
    //     return { id, ...data }

    // });
    // });
    this.resetForm();
  }

   getCategory() {
    this.categoryService.getCategories().subscribe(
      data => {
        let newData = JSON.stringify(data);
        this.adminCategories = JSON.parse(newData).data;
      }
    );
  }

  getForAdmin() {
    this.service.getCoins().subscribe(
      data => {
        let newData = JSON.stringify(data)
        this.list = JSON.parse(newData).data;
        this.page = JSON.parse(newData).pagination.page;

      })
  }

  selectCategory (event: any): string |number {
    console.log(event);
    this.categoryName = event.target.value;
    this.categoryId = event.target.selectedIndex;

    console.log(this.categoryName,  this.categoryId);
    return this.categoryName && this.categoryId;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  resetForm(form?) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      categoryId: null,
      categoryName: '',
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
      images: ['']
    };
  }








  onSubmit(form: NgForm) {
    const data: ICoin = Object.assign({}, form.value);
    data.categoryId = this.categoryId;
    console.log(data);
    delete data.id;
    if (form.value.id == null) {
      // this.firestore.collection('medals').add(data);
      this.service.postJSONCoin(data)
        // .map(res => {
        //   console.log(res);
        // })
        .subscribe(
          res => {
            console.log(res);
          }
        );

    } else {
      this.firestore.doc('medals/' + form.value.id).update(data);
    }
    this.resetForm(form);
    this.getForAdmin();
  }

  // addItem(event) {
  //   let file = event.target.value;
  //   console.log(file);

  //  let product :ICoin= new Coin(null, this.categoryId,
  //     this.categoryName, this.name, this.counter, this.reserved,
  //     this.isAvailable, this.series, this.year, this.metal,
  //     this.denomination, this.description, this.price, this.images);
  //   console.log(product);
  //   if (product.id == null) {
  //     this.service.postJSONCoin(product)
  //       .map(res => {  console.log(res)})
  //       .subscribe(
  //         res => {
  //           console.log(res);
  //         }
  //       );
  //   }
  // }





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
          console.log(data);
          this.images.push(data)
          console.log(this.images);
          if (this.images.length > 0) {
            this.isArrayImages = true;
          }
          return this.images;
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
