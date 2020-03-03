import { Component, OnInit } from '@angular/core';
import { MedalService } from 'src/app/shared/services/medal.service';
import { ActivatedRoute } from '@angular/router';
import { Medal } from 'src/app/shared/classes/medals.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product:any;
  constructor(private medalService:MedalService,
    private route:ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getData()
  }

getData():void{
  const id = this.route.snapshot.paramMap.get('id');
  this.medalService.userRef.doc(id).valueChanges().subscribe(
    data => {
      this.product = data
      // console.log(this.medal)
    })
}
back(): void {
  this.location.back();
}

  

buyProduct(medal:Medal){
  console.log(medal);
  
}

}
