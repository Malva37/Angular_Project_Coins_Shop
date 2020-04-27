import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/users.interfaces';
import { IUserCredentials } from '../interfaces/userCredentials.interfaces';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  formData: IUser;
  formDataSm:IUserCredentials;
  constructor() { }


}
