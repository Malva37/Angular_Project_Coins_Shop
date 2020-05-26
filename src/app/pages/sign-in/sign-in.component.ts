import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgForm, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
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
  form01: FormGroup;



  constructor(private service: AuthService,
    public share: UserServiceService,
    public builder: FormBuilder) {

    this.form01 = this.builder.group(
      {
        id: [null],
        isAdmin: [null],
        firstName: [null, [Validators.required, Validators.pattern('[A-Za-z\u0400-\u04FF][a-z\u0400-\u04FF]{1,19}')]],
        lastName: [null, [Validators.required, Validators.pattern('[A-Za-z\u0400-\u04FF][a-z\u0400-\u04FF]{1,19}')]],
        phone: [null, [Validators.required]],
        address: [null, [Validators.required, Validators.pattern('[a-zA-Z\u0400-\u04FF0-9-. ,/]{4,}')]],
        email: [null, [Validators.required, Validators.pattern('[a-zA-Z0-9-.]+\@{1}[a-z.]+')]],
        passwords:this.builder.group({
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]]
        },
          {validators:  this.confirmPasswordValidator}
        )
        // password: [null, [Validators.required],],
        // confirmPassword: new FormControl('', [Validators.required], this.confirmPasswordValidator)
      })
  }

  ngOnInit() {
    this.resetForm();
    this.show = false;

  }
  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
    console.log(control.value);
    console.log(this.password);
    
    if (control.value == this.password) {

      return { "userName": true };
    }
    return null;
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
      confirmPassword: '',
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
    debugger
    const user: IUserCredentials = Object.assign({}, form.value);
    console.log(user);

    this.service.postJSONUsers(user);
  }

  registration() {
    this.signStatus = true;
  }

  registrationFull(firstName, lastName, phone, address, password, confirmPassword, email) {
    let user = new User(1, firstName, lastName, email, phone, address, password, confirmPassword, this.isAdmin);
    this.service.createUsers(user);
  }


}
