import { Injectable } from '@angular/core';
import { User } from '../classes/users.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/users.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  formData: User;
  // userRef: AngularFirestoreCollection<User> = null;

  urlUsers: string;

  constructor(private http: HttpClient) {
    this.urlUsers = 'http://localhost:3000/users';
  }

  getJSONUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.urlUsers)
  }

  postJSONUsers(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.urlUsers, user)
  }

  deleteJSONUsers(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.urlUsers}/${id}`)
  }
  getOneUser(id :number): Observable<IUser> {
    return this.http.get<IUser>(`${this.urlUsers}/${id}`);
  }



}
