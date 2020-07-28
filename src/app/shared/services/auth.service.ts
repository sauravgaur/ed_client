import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE_KEYS } from "src/app/enum/go.enum";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;

  constructor(private store: LocalStoreService, private router: Router, private _http: HttpClient, ) {
    this.checkAuth();
  }

  checkAuth() {
    // this.authenticated = this.store.getItem("demo_login_status");
  }

  getuser() {
    return of({});
  }

  //   getCurrentSku(){
  //     return this.http.get<any>(AppSettings.BACKGROUND_CALL+'/runningSku');
  // }

  // saveSkus(obj: any[]) {
  //     return this.http.post<any>('runningSku', obj);
  // }


  signin(credentials) {

    // this.authenticated = true;
    // this.store.setItem("demo_login_status", true);
    // return of({}).pipe(delay(1500));
    return this._http.post<any>('login', credentials);
  }
  signout() {
    // this.authenticated = false;
    this.store.setItem("demo_login_status", false);
    // remove user from local storage to log user out
    var storageName = Object.keys(LOCAL_STORAGE_KEYS);
    storageName = storageName.slice(storageName.length / 2);
    for (let key of storageName) {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }
    localStorage.setItem("SIGNINOUT", "SIGNOUT")
    this.router.navigateByUrl("/sessions/signout");
  }
}
