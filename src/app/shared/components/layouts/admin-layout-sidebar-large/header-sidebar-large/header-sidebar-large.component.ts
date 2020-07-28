import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../../services/navigation.service';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';
import { GlobalService } from '../../../../../common/global.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-sidebar-large',
  templateUrl: './header-sidebar-large.component.html',
  styleUrls: ['./header-sidebar-large.component.scss'],
  providers: [HeaderService]
})
export class HeaderSidebarLargeComponent implements OnInit {

  notifications: any[];
  oldPassword: string = '';
  newPassword: string = '';
  loggedInUser: any;
  statusMsg: string = '';
  status: boolean = false;
  constructor(
    private navService: NavigationService,
    public searchService: SearchService,
    private auth: AuthService,
    private _router: Router,
    private _headerService: HeaderService,
    private _globalService: GlobalService,
    // private _toastrService: ToastrService
  ) {
    this.loggedInUser = this._globalService.getCurrentUser()
    this.notifications = [
      {
        icon: 'i-Speach-Bubble-6',
        title: 'New message',
        badge: '3',
        text: 'James: Hey! are you busy?',
        time: new Date(),
        status: 'primary',
        link: '/chat'
      },
      {
        icon: 'i-Receipt-3',
        title: 'New order received',
        badge: '$4036',
        text: '1 Headphone, 3 iPhone x',
        time: new Date('11/11/2018'),
        status: 'success',
        link: '/tables/full'
      },
      {
        icon: 'i-Empty-Box',
        title: 'Product out of stock',
        text: 'Headphone E67, R98, XL90, Q77',
        time: new Date('11/10/2018'),
        status: 'danger',
        link: '/tables/list'
      },
      {
        icon: 'i-Data-Power',
        title: 'Server up!',
        text: 'Server rebooted successfully',
        time: new Date('11/08/2018'),
        status: 'success',
        link: '/dashboard/v2'
      },
      {
        icon: 'i-Data-Block',
        title: 'Server down!',
        badge: 'Resolved',
        text: 'Region 1: Server crashed!',
        time: new Date('11/06/2018'),
        status: 'danger',
        link: '/dashboard/v3'
      }
    ];
  }

  ngOnInit() {
  }

  toggelSidebar() {
    const state = this.navService.sidebarState;
    if (state.childnavOpen && state.sidenavOpen) {
      return state.childnavOpen = false;
    }
    if (!state.childnavOpen && state.sidenavOpen) {
      return state.sidenavOpen = false;
    }
    if (!state.sidenavOpen && !state.childnavOpen) {
      state.sidenavOpen = true;
      setTimeout(() => {
        state.childnavOpen = true;
      }, 50);
    }
  }

  signout() {
    this.auth.signout();
  }

  openProfile() {
    this._router.navigate(["pages/profile"])
  }

  openPopover(){
    // console.log("in open popover")
    this.oldPassword = '';
    this.newPassword = '';
    this.status = false;
    this.statusMsg = '';
  }

  changePassword() {
    this.status = false;
    // console.log("pwds:", this.newPassword, this.oldPassword)
    //this._toastrService.success('Toastr success!', 'Toastr title', { timeOut: 3000, closeButton: true, progressBar: true });
    if (this.newPassword.trim() != '' && this.oldPassword.trim() != '') {
      this._headerService.updatePassword(this.loggedInUser.user_name, this.oldPassword, this.newPassword).subscribe((res: any) =>{
        if(res.status == 'success'){
          this.status = true
        }
        this.statusMsg = res.message
      })
    }else this.statusMsg = "Enter old and new password"
  }

}
