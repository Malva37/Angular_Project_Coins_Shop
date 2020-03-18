import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSeries'
})
export class FilterSeriesPipe implements PipeTransform {

  transform(arrProducts: Array<any>, value: any): any {
    if (!value || value == -1) { return arrProducts; }
    if (!arrProducts) { return []; }
    return arrProducts.filter(d => d.series.indexOf(value) !== -1)
  }

}
