import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE_KEYS, REDIRECT_LOGOUT_CODE, SUCCESS_MESSAGE_ALERT } from '../enum/go.enum';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { AppSettings } from '../common/app.static.settings';
import { NotifyService } from '../common/notify.service';
import { AuthenticationService } from '../_authService';
import { GlobalService } from '../common/global.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    redirectLogoutCode: string[] = Object.keys(REDIRECT_LOGOUT_CODE);
    displayMessages: string[] = Object.keys(SUCCESS_MESSAGE_ALERT);
    
    constructor(private _globalService: GlobalService, private _notifyService: NotifyService,
        private _authenticationService: AuthenticationService){
        this.displayMessages = this.displayMessages.slice(0, this.displayMessages.length / 2)
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        var reqUrl = request.url;
        var isBackground = false;
        if(reqUrl.indexOf(AppSettings.BACKGROUND_CALL) > -1){
            reqUrl = reqUrl.substr(AppSettings.BACKGROUND_CALL.length + 1, reqUrl.length)
            isBackground = true;
        }
        // if(!isBackground)
        //     this._globalService.startRequest();
        let token = localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.token]);
        // console.log("token:", token)
        let url = environment.API_ENDPOINT + reqUrl
        request = request.clone({
            url: url,
            setHeaders: {
                'x-access-token': `${token}`
            }
        });
        return next.handle(request).pipe(tap(resp=>{
            if (resp instanceof HttpResponse) {  
            // var res = resp.body
            // if (res.messages && res.messages[0]) {
            //     if (res.status == AppSettings.STATUS_FAIL) {
            //         this._notifyService.setErrorResponse(res.messages[0].message);
            //         if (this.redirectLogoutCode.indexOf('' + res.messages[0].code) > -1) {
            //             this._authenticationService.logout()
            //         }
            //     }
            //     else if (res.status == AppSettings.STATUS_SUCCESS && this.displayMessages.indexOf('' + res.messages[0].code) > -1) {
            //         this._notifyService.setSuccessResponse(res.messages[0].message);
            //     }
            // }
            // if(!isBackground)
            //     this._globalService.endRequest()
            }
        })) 
    }
}

