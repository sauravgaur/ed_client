import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE_KEYS } from '../enum/go.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient, private _router: Router, private _route: ActivatedRoute) { }

    login(username: string, password: string) {
        return this.http.post<any>('login', { username: username, password: password })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.data.token) {
                    // console.log("in res", res)
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    // localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        var storageName = Object.keys(LOCAL_STORAGE_KEYS);
        storageName = storageName.slice(storageName.length / 2);
        for (let key of storageName) {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        }
        this._router.navigate(['/login']);
    }

    isLoggedIn() {
        if (isNullOrUndefined(localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.token])))
            this.logout();
        // else
        //     this._router.navigate([this._route.snapshot.queryParams['returnUrl'] || '/dashboard']);
    }
}