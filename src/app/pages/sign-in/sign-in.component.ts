import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/classes/users.model';
import { IUser } from 'src/app/shared/interfaces/users.interfaces';
import { UserCredentials } from 'src/app/shared/classes/userCredentials';
import { ShareService } from 'src/app/shared/services/share.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  emailUser: string;
  passwordUser: string;
  signStatus: boolean;

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string = 'user';



  constructor(private service: AuthService,
    private share:ShareService) {

  } 
  ngOnInit() { }

  login(email, password) {
    let user = new UserCredentials(email,
       password);
    this.service.postJSONUsers(user);

  }
  registration(){
    this.signStatus=true;
  }


}
