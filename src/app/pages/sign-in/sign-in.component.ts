import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/classes/users.model';
import { UserCredentials } from 'src/app/shared/classes/userCredentials';
import { UserServiceService } from 'src/app/shared/services/User.service';
import { IUserCredentials } from 'src/app/shared/interfaces/userCredentials.interfaces';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  phoneMask = ['+', '3', '8', '(', '0', /\d{1}/, /\d{1}/, ')', /\d{1}/, /\d{1}/, /\d{1}/, '-', /\d{1}/, /\d{1}/, '-', /\d{1}/, /\d{1}/];
  userName: string;
  signStatus: boolean
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isAdmin: boolean = false;
  show: boolean;



  constructor(private service: AuthService,
    private share: UserServiceService) { }

  ngOnInit() {
    this.resetForm();
    this.show = false;

  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.share.formData = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      isAdmin: null
    };
    this.share.formDataSm = {
      userName: '',
      password: ''
    }
  }
  showPassword() {
    this.show = !this.show;
  }


  login(email, password) {
    let user = new UserCredentials(email,
      password);
    this.service.postJSONUsers(user);

  }




  onSubmit(form: NgForm) {
    const user: IUserCredentials = Object.assign({}, form.value);
    this.service.postJSONUsers(user);
  }

  registration() {
    this.signStatus = true;
  }

  registrationFull(firstName, lastName, phone, address, password, email) {
    let user = new User(1, firstName, lastName, phone, address, password, email, this.isAdmin);
    this.service.createUsers(user);
  }


}
