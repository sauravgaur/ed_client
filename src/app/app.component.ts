import { Component, OnInit } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from './enum/go.enum';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { NavigationService } from './shared/services/navigation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bootDash';
  constructor(private router: Router, private _navigationService: NavigationService) {

  }
  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.CURRENT_USER]))
    console.log("current user:", currentUser)
    if (isNullOrUndefined(currentUser)) {
      // console.log("in current user is null")
      localStorage.setItem("SIGNINOUT", "SIGNIN")
      this.router.navigate(['/sessions/signin'])
  } else {
    this._navigationService.publishNavigationChange(currentUser.role)
    // this.router.navigate(['/dashboard/v1'])
  }
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     var url = event.url.toString().substr(event.url.toString().lastIndexOf("/") + 1)
    //     console.log("url:", url)
    //     localStorage.setItem("SIGNINOUT", url == 'signout' ? 'SIGNOUT' : 'SIGNIN')
    //   }
    // });
  }

  // toasterMethod(status, title, desc, timeOut, closeButton, progressBar) {
  //   switch (status) {
  //     case 'success':
  //         this.toastr.success(desc, title, { timeOut: timeOut, closeButton: closeButton, progressBar: progressBar });
  //       break;
  //     case 'warning':
  //         this.toastr.warning(desc, title, { timeOut: timeOut, closeButton: closeButton, progressBar: progressBar });
  //       break;
  //     case 'info':
  //         this.toastr.info(desc, title, { timeOut: timeOut, closeButton: closeButton, progressBar: progressBar });
  //       break;
  //     case 'error':
  //         this.toastr.error(desc, title, { timeOut: timeOut, closeButton: closeButton, progressBar: progressBar });
  //       break;
  //   }
  // }
}
