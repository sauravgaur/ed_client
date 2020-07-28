import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  backgroundImg = '';
  constructor(private router : Router) {
    // console.log("in auth", localStorage.getItem("SIGNINOUT"))
    this.backgroundImg = localStorage.getItem("SIGNINOUT") == 'SIGNOUT' ? 'signout.png' : 'signin.jpg'
   }

  ngOnInit() {
  }

}
