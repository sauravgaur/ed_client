import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  providers: [UserService]
})
export class UsersProfileComponent implements OnInit {

  constructor(private _userService: UserService,
    private _toasterService: ToastrService) { }

  editing = {};
  searchControl: FormControl = new FormControl();
  filteredProducts;
  userList: any[] = []
  cols: any[] = []
  showLoading: boolean = false;
  ngOnInit() {
    this.cols = [
      // { field: 'gender', header: 'Gender' },
      { field: 'user_name', header: 'Username', width: '150px' },
      { field: 'first_name', header: 'First name', width: '150px' },
      { field: 'last_name', header: 'Last name', width: '150px' },
      { field: 'phone', header: 'Phone', width: '150px' },
      { field: 'address1', header: 'Address', width: '300px' },
      { field: 'email', header: 'Email', width: '200px' },
    ];
    this.showLoading = true
    this._userService.getUserList()
      .subscribe((res: any) => {
        this.userList = [...res.data];
        this.filteredProducts = cloneDeep(this.userList);
        this.showLoading = false;
      });
  }

  updateValue(event) {
    // console.log('inline editing rowIndex', event)
    var oldObj = this.filteredProducts.find(itm => itm.id == event.data.id)
    var field = event.field
    var flg = false;
    if (event.field == 'firstname'){
      flg = oldObj.first_name != event.data.first_name
      field = 'first_name'
    }
    else if (event.field == 'lastname'){
      flg = oldObj.last_name != event.data.last_name
      field = 'last_name'
    }
    else if (event.field == 'phone')
      flg = oldObj.phone != event.data.phone
    else if(event.field == 'address1')
      flg = oldObj.address1 != event.data.address1

    // var fieldName = cell == 'firstname' ? 'first_name' : cell == 'lastname' ? 'last_name' : cell
    //   this._userService.updateUserList(id, fieldName, event.target.value)
    if (flg) {
      this._userService.updateUserList(event.data.id, event.field, event.data[field])
        .subscribe((res: any) => {
          // console.log("after update")
          this.filteredProducts = cloneDeep(this.userList)
          this._toasterService.success(event.field + ' update successfully !!', 'Profile Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
        });
    }
  }
}
