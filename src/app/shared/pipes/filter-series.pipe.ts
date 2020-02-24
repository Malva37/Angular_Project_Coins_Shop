import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSeries'
})
export class FilterSeriesPipe implements PipeTransform {

  transform(arrCoins: Array<any>, value: any): any {
    if (!value || value == -1) { return arrCoins; }
    if (!arrCoins) { return []; }
    return arrCoins.filter(d => d.series.indexOf(value) !== -1)
  }

}
