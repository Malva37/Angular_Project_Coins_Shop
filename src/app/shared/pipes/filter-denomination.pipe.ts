import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDenomination'
})
export class FilterDenominationPipe implements PipeTransform {

  transform(arrProducts: Array<any>, value: any): any {
    if (!value || value == -1) { return arrProducts; }
    if (!arrProducts) { return []; }
    return arrProducts.filter(d => d.denomination.indexOf(value) !== -1)
  }

}
