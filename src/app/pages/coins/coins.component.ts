import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/coins.service';
import { ICoin } from 'src/app/shared/interfaces/coins.interfaces';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {

  constructor(private prService:ProductsService) { }
coins:Array<ICoin>=[];
buttonsShow:boolean;
  ngOnInit() {
    this.getCoins()
  }

  private getCoins(): void {
    this.prService.getJSONCoins().subscribe(
      data => {
        this.coins = data;
      }
    )
  }

}
