import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {

  transform(arrCoins: Array<any>, value: any): any {
    if (!value || value == -1) { return arrCoins; }
    if (!arrCoins) { return []; }
    return arrCoins.filter(d => d.year.indexOf(value) !== -1)
  }


}
