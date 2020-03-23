import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { UserServiceService } from 'src/app/shared/services/User.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/classes/users.model';


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
  // user:any;
  user = {
    email: '',
    password: ''
 };

 id: string;
 firstName: string;
 lastName: string;
 email: string;
 password: string;
 phone: string;
 address: string;
 role:string = 'user';

  constructor(private firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private service: UserServiceService,
    private authService: AuthService,
    private router:Router) { }

  ngOnInit() {
    this.resetForm();
  };

  
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      role:'user'
    };
  }

  
  onSubmit(form: NgForm) {

    const data: User = Object.assign({}, form.value);
    debugger
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('users').add(data);
      console.log(data);
      
    } else {
      this.firestore.doc('users/' + form.value.id).update(data);
    }
    this.resetForm(form);
  }



  enter(email, password) {

    this.service.userRef.doc('id').snapshotChanges().subscribe(
      data => {
        this.currentUser = data
        console.log(this.currentUser);

      })
  }


  signInWithEmail() {
    console.log(this.user.email, this.user.password);
    
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);

        this.router.navigate(['user']);
      })
      .catch((err) => console.log('error: ' + err));
  }


}


