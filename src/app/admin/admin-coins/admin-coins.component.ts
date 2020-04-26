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
import { IImage } from 'src/app/shared/interfaces/image.interfaces';
import { Image } from 'src/app/shared/classes/image.model';
import { prototype } from 'events';


@Component({
  selector: 'app-admin-coins',
  templateUrl: './admin-coins.component.html',
  styleUrls: ['./admin-coins.component.scss']
})
export class AdminCoinsComponent implements OnInit {
  modalRef: BsModalRef;
  formData: Coin;
  list: Array<ICoin>;
  adminCategories: Array<ICategory>;
  page: number;
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  count: number;
  reserved: number;
  isAvailable: boolean;
  series: string;
  year: number;
  metal: string;
  denomination: number;
  description: string;
  price: number;
  isVisibleForUsers: boolean;
  images: Array<IImage> = [];
  image: IImage;
  // imageReverse: string;
  downloadSrc: string;
  product: ICoin;
  totalPages: number;
  editStatus: boolean;
  // currentIdProduct:number;
  // title: boolean;
  isArrayImages: boolean;


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
    private categoryService: CategoriesService) { }

  ngOnInit() {
    this.getForAdmin();
    this.getCategory();
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
        this.totalPages = Math.ceil(JSON.parse(newData).pagination.total / 10);
      })
  }

  selectCategory(event: any): string | number {
    this.categoryName = event.target.value;
    this.categoryId = event.target.selectedIndex;
    return this.categoryName && this.categoryId;
  }

  fieldsChange(product) {
    console.log(product);
    this.service.updateCoin(product).subscribe(
      () => {
        this.getForAdmin();
      }
    );
  }

  openModal(template: TemplateRef<any>, product?) {
    this.modalRef = this.modalService.show(template);
    this.product = product;

  }

  openModalImage(template: TemplateRef<any>, product?) {
    this.modalRef = this.modalService.show(template);
    this.product = product;
    this.images = product.images;
    // console.log(product);
    // return this.currentIdProduct;
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
      count: null,
      reserved: null,
      isAvailable: null,
      series: '',
      year: null,
      metal: '',
      denomination: null,
      description: '',
      price: null,
      isVisibleForUsers: false,
      images: []
    };
  }

  onSubmit(form: NgForm) {
    const data: ICoin = Object.assign({}, form.value);
    if (!this.editStatus) {
      this.service.postJSONCoin(data)
        .subscribe(
          res => {
            console.log(res);
            this.getForAdmin();
          });
    } else {
      this.service.updateCoin(data).subscribe(
        () => {
          this.getForAdmin();
        }
      )
    }
    this.editStatus = false;
    this.resetForm();
    // this.getForAdmin();

  }
  deleteProduct(product) {
    console.log(product);
    this.service.deleteCoin(product.id).subscribe(
      () => {
        this.getForAdmin();
      }
    )
    // this.getForAdmin();
  }

  addImages(images) {
    console.log(this.product);
    console.log(images);

    this.product.images = images;
    this.service.updateCoin(this.product).subscribe(
      () => {
        this.getForAdmin();
      }
    );

  }

  deleteImage(image) {
    this.afStorage.storage.refFromURL(image.url).delete();
    this.images = this.images.filter(obj => {
      return obj.url !== image.url;
    })
    if (image.title) {
      this.images[0].title = true;
    }
    console.log(this.images);

    if (image.id != null) {
      // sent request with (image.id)
    }

  }

  onEdit(product, template) {
    this.openModal(template, product);
    console.log(product);

    this.service.formData = Object.assign({}, product);
    console.log(product);
    this.editStatus = true;

    // this.image = coin.image;
    // this.imageReverse = coin.imageReverse;
    // this.editImageStatus = true;
    // this.editImageReverseStatus = true;
  }

  public upload(event: any): void {
    const file = event.target.files[0];
    const filePath = `images/coins/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges()
      .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
      .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/coins/${e.metadata.name}`).getDownloadURL().subscribe(
        data => {
          let image: IImage = new Image(null, data, false)
          this.images.push(image);
          if (this.images.length > 0) {
            this.isArrayImages = true;

            this.images[0].title = true;

            return this.images;
          }
        }
      );
    }
    );
  }
  changeStatusTitleImage(image) {

    this.images[0].title = false;

    if (image.title) { image.title = false } else { image.title = true }
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
