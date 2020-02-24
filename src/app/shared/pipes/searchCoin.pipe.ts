import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCoin'
})
export class SearchCoinPipe implements PipeTransform {

  transform(arrCoins:Array<any>, value:string): any {
    if(!value) {return arrCoins;}
    if(!arrCoins) {return [];}
    return arrCoins.filter(d =>d.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
  }

}
