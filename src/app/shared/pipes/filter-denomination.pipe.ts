import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDenomination'
})
export class FilterDenominationPipe implements PipeTransform {

  transform(arrCoins: Array<any>, value: any): any {
    if (!value || value == -1) { return arrCoins; }
    if (!arrCoins) { return []; }
    return arrCoins.filter(d => d.denomination.indexOf(value) !== -1)
  }

}
