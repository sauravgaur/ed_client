import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private http: HttpClient
  ) { }

  updatePassword(username, oldPassword, newPassword){
    return this.http.put('updatePassword', {username: username, oldPassword: oldPassword, newPassword: newPassword})
  }
}
