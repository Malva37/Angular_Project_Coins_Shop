import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMetal'
})
export class FilterMetalPipe implements PipeTransform {

  transform(arrCoins: Array<any>, value: any): any {
    if (!value || value == -1) { return arrCoins; }
    if (!arrCoins) { return []; }
    return arrCoins.filter(d => d.metal.indexOf(value) !== -1)
  }


}
