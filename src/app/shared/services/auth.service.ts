import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  
  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  public checkAdminLogin: boolean;
  public checkUserLogin: boolean;

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router,
              private ngZone: NgZone) { }


  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp(email: string, password: string,  phone, address,firstName,lastName) {
    debugger
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        // add the user to the "users" database
        const user = {
          id: userResponse.user.uid,
          username: userResponse.user.email,
          role: 'user',
        };
        //add the user to the database
        this.firestore.collection('users').add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              this.setUserStatus(this.currentUser);
              this.router.navigate(['/']);
            });
          }).catch(err => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('An error ocurred: ', err);
      });

  }

  login(email: string, password: string) {
    debugger
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.firestore.collection('users').ref.where('username', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            console.log('userRef', userRef.data());
            this.currentUser = userRef.data();
            this.setUserStatus(this.currentUser);
            localStorage.setItem('user', this.currentUser);
            if (userRef.data().role !== 'admin') {
              this.checkUserLogin = true;
              this.router.navigate(['/profile']);
            } else {
              this.checkAdminLogin = true;
              this.router.navigate(['/admin']);
            }
          });
        });
      }).catch(err => err)
  }

  logOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('user signed Out successfully');
        //set current user to null to be logged out
        this.currentUser = null;
        //set the listenener to be null, for the UI to react
        this.setUserStatus(null);
        this.ngZone.run(() => this.router.navigate(['/login']));
        this.checkAdminLogin = false;
        this.checkUserLogin = false;
      }).catch((err) => {
        console.log(err);
      })
  }


  isAdminLogin(): boolean {
    return this.checkAdminLogin;
  }

  isUserLogin(): boolean {
    return this.checkUserLogin;
  }
}
