import { Component, OnInit } from '@angular/core';
import { MedalService } from 'src/app/shared/services/medal.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ProductOrder } from 'src/app/shared/classes/productOrder.model';
import { IProductOrder } from 'src/app/shared/interfaces/productOrder.interfaces';
import { CoinService } from 'src/app/shared/services/coin.service';
import { AccessoryService } from 'src/app/shared/services/accessory.service';
import { BanknoteService } from 'src/app/shared/services/banknote.service';
import { ShareService } from 'src/app/shared/services/share.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  count: number = 1;
  articles: Array<ProductOrder> = [];
  coinsActive:boolean;
  banknotesActive:boolean;
  clickCnt: number = 0;
  sumBasket: number = 0;


  constructor(private medalService: MedalService,
    private coinService: CoinService,
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

  getData(): void {
    const category = this.route.snapshot.paramMap.get('categoryName');
    const id = this.route.snapshot.paramMap.get('id');
    if (category == 'medals') {
      this.medalService.userRef.doc(id).valueChanges().subscribe(
        data => {
          this.product = data 
        })
    }

    if (category == 'coins') {
      this.coinService.userRef.doc(id).valueChanges().subscribe(
        data => {
          this.product = data;
         this.coinsActive = true;
         console.log(this.product);
         
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


  buyProduct(product: any): void {
    const newItem: IProductOrder = new ProductOrder(product.id, product.categoryId, product.name, product.image, product.price, this.count, product.price);
    newItem.amount = this.count * product.price;
    localStorage.setItem(product.id, JSON.stringify(newItem));
    this.share.plusItem();

  }





}
