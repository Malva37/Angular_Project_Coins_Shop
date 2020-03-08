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

  nameUser: string;
  userPage: boolean;
  adminPage: boolean;
  guestpage: boolean;
  registrationOn: boolean;
  registrationOff: boolean
  passwordField: boolean;
  titleButton: string = 'Змінити пароль';

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  emailUser: string;
  passwordUser: string;





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
      phone: '',
      address: '',
      password: ''
    };
  }

  enter() {
    if (this.emailUser == 'a' && this.passwordUser == 'a') {
      this.guestpage = true;
      this.adminPage = true;
    }
    // this.service.getUsers().snapshotChanges().pipe(
    //   map(changes => changes.map(
    //     c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
    //   )
    // ).subscribe(users => {
    //   users.forEach(element => {
    //     // debugger
    //     console.log(element.email, element.password);
    //     console.log(this.emailUser, this.passwordUser);
    //     if (element.password == this.passwordUser) {
    //       if (element.email == this.emailUser) {
    //         this.service.updateUser(element.key, { loginStatus: true })
    //         this.currentUser.userEmail = element.userEmail;
    //         this.currentUser.userName = element.userName;
    //         this.currentUser.userAdmin = element.userAdmin;
    //         this.currentUser.loginStatus = element.loginStatus;
    //         this.modalRef.hide()
    //         console.log('log true');
    //       }
    //     }
    //   })

    }


    // if (this.emailUser) {

    //   // getData():void{
    //   //   const id = this.route.snapshot.paramMap.get('id');
    //   //   this.medalService.userRef.doc(id).valueChanges().subscribe(
    //   //     data => {
    //   //       this.product = data
    //   //       // console.log(this.medal)
    //   //     })
    //   // }
    // }
  





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
      return this.nameUser = data.firstName;

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
