import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from 'src/app/enum/go.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavigationService } from '../../../shared/services/navigation.service';
@Component({
    selector: 'app-signout',
    templateUrl: './signout.component.html',
    animations: [SharedAnimations]
})
export class SignoutComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    errorMsg: string = '';
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private _navigationService: NavigationService
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signin() {
        console.log("in sign out comp")
        this.loading = true;
        this.loadingText = 'Sigining in...';
        // var credentials = this.signinForm.value
        // credentials.password = this.signinForm.controls.password.value
        this.auth.signin(this.signinForm.value)
            .subscribe(res => {
                if(res.status == 'success'){
                    localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.token], res.data.token);
                    const jwtHelper = new JwtHelperService();
                    var currentUser = jwtHelper.decodeToken(res.data.token)
                    localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.CURRENT_USER], JSON.stringify(res.data.user))
                    this._navigationService.publishNavigationChange(res.data.user.role)
                    this.router.navigateByUrl('/dashboard/v1');
                }else {
                    this.errorMsg = res.message
                }
                this.loading = false;
            });
    }

}
