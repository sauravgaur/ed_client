import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../common/global.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/enum/go.enum';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/common/app.static.settings';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {

  constructor(private _globalService: GlobalService,
    private modalService: NgbModal, private _userService: UserService,
    private _toasterService: ToastrService) { }
  loggedInUser: any
  profile: any = {first_name: '', last_name: '', phone: ''}
  loading1: boolean = false;
  loadingText1: string;
  ngOnInit() {
    this.loggedInUser = this._globalService.getCurrentUser();
    // console.log("this.logge")
    this.profile = Object.assign({}, this.loggedInUser);
  }

  openProfile(content){
    this.profile = Object.assign({}, this.loggedInUser);
    // console.log("content:", content)
    // this.profile = {first_name: this.loggedInUser.first_name, last_name: this.loggedInUser.last_name, phone: this.loggedInUser.phone}
    // console.log("in open profile:", this.profile)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      // console.log(result);
    }, (reason) => {
      // console.log('Err!', reason);
    });
  }

  updateInfo(){
    this.loading1 = true;
    this.loadingText1 = 'Updating profile...';
    // console.log("before update info:", this.profile)
    this._userService.updateUserProfile(this.profile).subscribe((resp: any) =>{
      // console.log("after udpate info")
      if(resp.status == "success"){
        this._toasterService.success('Update Successfully !!', 'Profile Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
        this.loggedInUser.first_name = this.profile.first_name
        this.loggedInUser.last_name = this.profile.last_name
        this.loggedInUser.phone = this.profile.phone
        localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.CURRENT_USER], JSON.stringify(this.loggedInUser))
        this.modalService.dismissAll()
      }else this._toasterService.error('Something went wrong!!', 'Profile Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_FALSE, progressBar: AppSettings.TOAST_PROGRESSBAR_FALSE });
      this.loading1 = false;
    })
  }
}
