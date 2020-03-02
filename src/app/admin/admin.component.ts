import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userPage: boolean;
  guestpage: boolean;
  constructor() { }

  ngOnInit() {
  }

  showUserFields() {
    this.userPage = true;
    this.guestpage = true;
  }




}
