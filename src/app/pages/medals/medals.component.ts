import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MedalService } from 'src/app/shared/services/medal.service';
import { Medal } from 'src/app/shared/classes/medals.model';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.scss']
})
export class MedalsComponent implements OnInit {
  list:Medal[];
  buttonsShow: boolean;
  searchName: string;
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  constructor(private firestore: AngularFirestore,
    private service: MedalService) { }


    ngOnInit() {
      this.service.getMedals().subscribe(actionArray => {
        this.list = actionArray.map(item => {
          return {
            id: item.payload.doc.id, 
            ...item.payload.doc.data()
          } as Medal;
        });
        this.getMinPrice(this.list);
        this.getMaxPrice(this.list); 
      });
    }
  
  
    getMaxPrice(list) {
      let max = list[0].price;
      for (let i = 1; i < list.length; ++i) {
        if (list[i].price > max) {
          max = list[i].price;
        }
      }
      this.options.ceil = max;
      this.maxValue = max;
    }
  
  
    getMinPrice(list) {
      let min = list[0].price;
      for (let i = 1; i < list.length; ++i) {
        if (list[i].price <min) {
          min = list[i].price;
        }
      }
      this.options.floor = min;
      this.minValue = min;
    }

    
buyProduct(medal:Medal){
  console.log(medal);
}

}
