import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserCredentials } from '../classes/userCredentials';
import { Router } from '@angular/router';
import { ShareService } from './share.service';
import { User } from '../classes/users.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;

  constructor(private http: HttpClient,
    private router: Router,
    private share: ShareService) {
    this.baseUrl = environment.apiUrl;
  }


  getJSONUser(): Observable<Array<UserCredentials>> {
    return this.http.get<Array<UserCredentials>>(`${this.baseUrl}/authenticate`)
  }






  postJSONUsers(user: UserCredentials) {
    this.http.post<any>(`${this.baseUrl}/authenticate`, user,
      { observe: 'response' }).subscribe(response => {
        localStorage.setItem('token', response.body.token)
        localStorage.setItem('isAdmin', response.body.isAdmin)
        if (response.body.isAdmin) {
          this.router.navigate(['/admin']);
          this.share.adminHere();
          this.share.anyHere();
        } else {
          this.router.navigate(['/profile']);
          this.share.userHere();
          this.share.anyHere();

        }
      });
  }
  createUsers(user: User) {
    this.http.post<any>(`${this.baseUrl}/authenticate`, user,
      { observe: 'response' }).subscribe(response => {
        localStorage.setItem('token', response.body.token)
        localStorage.setItem('isAdmin', response.body.isAdmin)
        if (response.body.isAdmin) {
          this.router.navigate(['/admin']);
          this.share.adminHere();
          this.share.anyHere();
        } else {
          this.router.navigate(['/profile']);
          this.share.userHere();
          this.share.anyHere();

        }
      });
  }


  isAdminLogin(): boolean {
    return localStorage.getItem('isAdmin') == 'true';
  }

  isUserLogin(): boolean {
    return localStorage.getItem('isAdmin') == 'false';
  }



















  deleteJSONUsers(id: number): Observable<UserCredentials> {
    return this.http.delete<UserCredentials>(`${this.baseUrl}/${id}`)
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }
}
