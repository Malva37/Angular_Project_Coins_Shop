import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { UserServiceService } from 'src/app/shared/services/User.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/classes/users.model';
import { IUser } from 'src/app/shared/interfaces/users.interfaces';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  emailUser: string;
  passwordUser: string;
  signStatus: boolean;




  // currentUser: any;
  // currentUserPage: boolean;

  // user = {
  //   email: '',
  //   password: ''
  // };

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string = 'user';
  user: IUser;
  usersRef: AngularFirestoreCollection<User> = null;
  // constructor(private db: AngularFirestore) {
  //   this.usersRef = db.collection(this.dbPath);
  // }

  constructor(private firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private service: UserServiceService,
    private authService: AuthService,
    private router: Router,
    private db: AngularFirestore) {

  }

  ngOnInit() {
    this.resetForm();
  };

  addUser(email, password) {
    this.signStatus = true;
    const user: IUser = new User(
      this.id = null,
      this.firstName = '',
      this.lastName = '',
      this.email = email,
      this.phone = '',
      this.address = '',
      this.password = password,
      this.role = 'user');
    console.log(user);

    this.service.postJSONUsers(user).subscribe(
      () => {
        this.user = user;
        console.log(user);

      }


    );
    // this.service.formData.password = password;
    // this.service.formData.email = email;
  }





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
      role: 'user'
    };
  }


  onSubmit(form: NgForm) {

    const data: User = Object.assign({}, form.value);
    data.email = this.user.email;
    data.password = this.user.password;
    console.log(data);
    // const user: IUser = new User(1, this.firstName, this.lastName, this.email, this.phone, this.address, this.password, this.role = 'user')
    // console.log(user);
    // this.resetForm(form);

  }




}


