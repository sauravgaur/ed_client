import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserList() {
    return this.http.get('userList');
  }

  updateUserList(id, field, val) {
    return this.http.put('userList', {id: id, field: field, value: val});
  }

  updateUserProfile(profile) {
    return this.http.put('userProfile', profile);
  }

  updatePassword(username, oldPassword, newPassword){
    return this.http.put('updatePassword', {username: username, oldPassword: oldPassword, newPassword: newPassword})
  }
}
