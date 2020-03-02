import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCoin'
})
export class SearchCoinPipe implements PipeTransform {

  transform(list:Array<any>, value:string): any {
    if(!value) {return list;}
    if(!list) {return [];}
    return list.filter(d =>d.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
  }

}
