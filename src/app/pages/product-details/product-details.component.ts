import { Component, OnInit } from '@angular/core';
import { MedalService } from 'src/app/shared/services/medal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { CoinService } from 'src/app/shared/services/coin-for-admin.service';
import { AccessoryService } from 'src/app/shared/services/accessory.service';
import { BanknoteService } from 'src/app/shared/services/banknote.service';
import { ShareService } from 'src/app/shared/services/share.service';
import { CoinForUserService } from 'src/app/shared/services/coin-for-user.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  count: number = 1;
  articles: Array<ProductOrder> = [];
  coinsActive: boolean;
  banknotesActive: boolean;

  clickCnt: number = 0;
  sumBasket: number = 0;
  images = [];



  constructor(private medalService: MedalService,
    private coinService: CoinForUserService,
    private accessoriesService: AccessoryService,
    private banknotesService: BanknoteService,
    private route: ActivatedRoute,
    private location: Location,
    private share: ShareService) {
    this.share.onClickNumber.subscribe(cnt => this.clickCnt = cnt);
    this.share.onClickSum.subscribe(sum => this.sumBasket = sum);
  }

  ngOnInit() {
    this.getData();
  }

  pressImage(image) {
    this.images.forEach(element => {
      if (element.active == true) {
        element.active = false;
        image.active = true;
      }
    });

  }

  getData(): void {
    const category = this.route.snapshot.paramMap.get('categoryName');
    const id = this.route.snapshot.paramMap.get('id');
    if (category == 'medals') {
      this.medalService.userRef.doc(id).valueChanges().subscribe(
        data => {
          this.product = data;
          
        })
    }

    if (category == 'coins') {
      this.coinService.getOneCoin(+id).subscribe(
        data => {
          this.product = data;
          this.coinsActive = true;
          this.images = data.images;
          this.images.forEach(element => {
            element.active = false;
            if (element.isTitle == true) {
              element.active = true;
            }
          });
        })
    }


    if (category == 'banknote') {
      this.banknotesService.userRef.doc(id).valueChanges().subscribe(
        data => {
          this.product = data;
          this.banknotesActive = true;

        })


    }

    if (category == 'accessories') {
      this.accessoriesService.userRef.doc(id).valueChanges().subscribe(
        data => {
          this.product = data;
  
        })


    }


  }


  pullLeft() {

  }

  pullRight() {

  }


  back(): void {
    this.location.back();
  }
  statusCount(bool: boolean) {
    if (bool == true) {
      this.count++;
      console.log(this.count);

    }
    else {
      this.count--;
      console.log(this.count);
    }
  }


  // statusCount(bool: boolean) {
  //   debugger
  //   if (bool) {
  //     this.count++;
  //     item.amount = item.count * item.price;
  //     let editItem = JSON.stringify(item);
  //     localStorage.setItem(item.id, editItem);
  //     console.log(editItem);
  //     this.getArticles();

  //   }
  //   else {
  //     item.count--;
  //     item.amount = item.count * item.price;
  //     let editItem = JSON.stringify(item);
  //     localStorage.setItem(item.id, editItem);
  //     console.log(editItem);
  //     this.getArticles();
  //   }
  //   this.share.plusItem();
  // }

  buyProduct(product: any): void {
    const newItem: IProductOrder = new ProductOrder(product.id, product.categoryId, product.name, product.image, product.price, this.count, product.price);
    newItem.amount = this.count * product.price;
    localStorage.setItem(product.id, JSON.stringify(newItem));
    this.share.plusItem();

  }





}
