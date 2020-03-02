import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../shared/services/User.service';
import { User } from '../shared/classes/users.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
 nameUser:string;
  userPage: boolean;
  guestpage: boolean;
  registrationOn: boolean;
  registrationOff: boolean
  passwordField: boolean;
  titleButton :string = 'Змінити пароль';

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  address: string;
   



  constructor(private service: UserServiceService,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.resetForm();
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
      password: '',
      phone: null,
      address: ''
    };
  }

  showUserFields() {
    this.userPage = true;
    this.guestpage = true;
  }

  onSubmit(form: NgForm) {
    debugger

    const data: User = Object.assign({}, form.value);
 
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('users').add(data);
      this.registrationOn = true;
      this.registrationOff = true;
      this.passwordField = true;
      this.titleButton = 'Змінити пароль';
      return this.nameUser= data.firstName;

    } else {
      this.passwordField = false;
      this.firestore.doc('users/' + form.value.id).update(data);
    }
    // this.resetForm(form);
  }
  // changePassword(event) {
  //   this.passwordField = false;
  //   this.service.formData.password = '';
  //   this.titleButton = event.target.innerText;
  //  return this.titleButton = 'Зберегти пароль';
  //   // console.log(event);

  // }

  delete(downloadUrl) {
    return this.afStorage.storage.refFromURL(downloadUrl).delete();
  }
  



}
