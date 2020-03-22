
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin-page',
  templateUrl: './adminPage.component.html',
  styleUrls: ['./adminPage.component.scss']
})

export class AdminGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    return confirm('Вы уверены, что хотите перейти?');
  }
}