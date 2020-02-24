import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

  transform(arrCoins: Array<any>, min: number, max: number): any {
    const result = arrCoins.filter(coin =>
      (coin.price >= min && coin.price <= max))
    return result;
  }

}
