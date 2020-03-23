import { Injectable } from '@angular/core';

import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  private user: Observable<firebase.User>;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
        this.user = _firebaseAuth.authState;
    }


    signInRegular(email, password) {
      console.log(email);
      console.log(password);
      
      const credential = firebase.auth.EmailAuthProvider.credential( email, password );
   return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
   }
}
