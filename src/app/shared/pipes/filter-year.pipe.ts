import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {

  transform(arrProducts: Array<any>, value: any): any {
    if (!value || value == -1) { return arrProducts; }
    if (!arrProducts) { return []; }
    return arrProducts.filter(d => d.year.indexOf(value) !== -1)
  }


}
