import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSign'
})
export class FilterSignPipe implements PipeTransform {

  transform(arrProducts: Array<any>, value: any): any {
    if (!value || value == -1) { return arrProducts; }
    if (!arrProducts) { return []; }
    return arrProducts.filter(d => d.signature.indexOf(value) !== -1)
  }

}
