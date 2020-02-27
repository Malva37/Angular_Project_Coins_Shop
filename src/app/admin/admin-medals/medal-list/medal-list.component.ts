import { Component, OnInit } from '@angular/core';
import { Medal } from 'src/app/shared/classes/medals.model';
import { MedalService } from 'src/app/shared/services/medal.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMedal } from 'src/app/shared/interfaces/medals.interfaces';

@Component({
  selector: 'app-medal-list',
  templateUrl: './medal-list.component.html',
  styleUrls: ['./medal-list.component.scss']
})
export class MedalListComponent implements OnInit {
  list: Medal[];
  constructor(private service: MedalService,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.service.getMedals().subscribe(actionArray  => {
      console.log(actionArray);
      
      this.list = actionArray.map(item => {
        console.log(item);
        console.log(item.payload.doc.data());
        
        return {
          id: item.payload.doc.id, ...item.payload.doc.data()
        } as Medal;
      });
    });
  }

  onEdit(medal: Medal) {
    this.service.formData = Object.assign({}, medal);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this medal?')) {
      this.firestore.doc('medals/' + id).delete();
    }
  }

}
