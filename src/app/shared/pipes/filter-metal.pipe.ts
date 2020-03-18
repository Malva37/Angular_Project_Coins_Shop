import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMetal'
})
export class FilterMetalPipe implements PipeTransform {

  transform(arrProducts: Array<any>, value: any): any {
    if (!value || value == -1) { return arrProducts; }
    if (!arrProducts) { return []; }
    return arrProducts.filter(d => d.metal.indexOf(value) !== -1)
  }


}
