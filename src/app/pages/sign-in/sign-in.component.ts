import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { UserServiceService } from 'src/app/shared/services/User.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  emailUser: string;
  passwordUser: string;
  currentUser: any;
  currentUserPage: boolean;

  constructor(private firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private service: UserServiceService) { }

  ngOnInit() {
  }


  enter(email, password) {

    this.service.userRef.doc('id').snapshotChanges().subscribe(
      data => {
        this.currentUser = data
console.log(this.currentUser);

      })


  }


}