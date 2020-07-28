import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from '../../common/global.service';
export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    originalMenu: IMenuItem[];
    adminUserMenu: IMenuItem[];
    userMenu: IMenuItem[];
    userType: any;
    constructor(private _globalService: GlobalService) {

        this.userMenu = [
            {
                name: 'Dashboard',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                // type: 'dropDown',
                type: 'link',
                icon: 'dashboard.png',
                state: '/dashboard/v1',
            },
            {
                name: 'Patient List Book',
                description: 'Patient list',
                type: 'link',
                icon: 'patient-list.png',
                state: '/uikits/filter-table'
            },
            {
                name: 'Reports',
                description: 'Report / Tracking',
                type: 'dropDown',
                icon: 'report.png',
                sub: [
                    { icon: 'alert-report.png', name: 'Alert report', state: '/uikits/report-tracking', type: 'link' },
                    { icon: 'email-track.png', name: 'Email tracking report', state: '/uikits/email-tracking', type: 'link' },
                    { icon: 'email-queue.png', name: 'Email queue', state: '/uikits/email-queue', type: 'link' },
                    { icon: 'lookup-fail.png', name: 'Lookup failed', state: '/uikits/lookup-failed', type: 'link' },
                    { icon: 'public-domain.png', name: 'Public domain emails', state: '/uikits/report-public-domain', type: 'link' },
                    { icon: 'patient-discharge.png', name: 'Discharged patients list', state: '/uikits/discharge', type: 'link' },
                    { icon: 'multiple.png', name: 'Multiple lookup list', state: '/uikits/multiplelookup', type: 'link' },
                    { icon: 'admission.png', name: 'New admissions', state: '/uikits/newadmissions', type: 'link' }
                ]
            },
            {
                name: 'Audit log',
                description: 'Audit logs',
                type: 'link',
                icon: 'log.png',
                state: '/uikits/audit-log'
            },
            {
                name: 'Profile',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'link',
                icon: 'profile.png',
                state: '/pages/profile'
            },
            {
                name: 'DB Settings',
                description: 'DB Settings',
                type: 'link',
                icon: 'db-settings.png',
                state: '/uikits/db-switch'
            },
            {
                name: 'Patient Book',
                description: 'Patient list',
                type: 'link',
                icon: 'patient-book.png',
                state: '/uikits/tree-table'
            }
        ]
        this.adminUserMenu = [
            {
                name: 'Dashboard',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'link',
                icon: 'dashboard.png',
                state: '/dashboard/v1',
            },
            {
                name: 'Patient List Book',
                description: 'Patient list',
                type: 'link',
                icon: 'patient-book.png',
                state: '/uikits/filter-table'
            },
            {
                name: 'Reports',
                description: 'Report / Tracking',
                type: 'dropDown',
                icon: 'report.png',
                // state: '/uikits/report-tracking'
                sub: [
                    { icon: 'alert-report.png', name: 'Alert report', state: '/uikits/report-tracking', type: 'link' },
                    { icon: 'email-track.png', name: 'Email tracking report', state: '/uikits/email-tracking', type: 'link' },
                    { icon: 'email-queue.png', name: 'Email queue', state: '/uikits/email-queue', type: 'link' },
                    { icon: 'lookup-fail.png', name: 'Lookup failed', state: '/uikits/lookup-failed', type: 'link' },
                    { icon: 'public-domain.png', name: 'Public domain emails', state: '/uikits/report-public-domain', type: 'link' },
                    { icon: 'patient-discharge.png', name: 'Discharged patients list', state: '/uikits/discharge', type: 'link' },
                    { icon: 'multiple.png', name: 'Multiple Lookup', state: '/uikits/multiplelookup', type: 'link' },
                    { icon: 'admission.png', name: 'New admissions', state: '/uikits/newadmissions', type: 'link' }
                ]
            },
            {
                name: 'Audit log',
                description: 'Audit logs',
                type: 'link',
                icon: 'log.png',
                state: '/uikits/audit-log'
            },
            {
                name: 'Profile',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'profile.png',
                sub: [
                    { icon: 'my-profile.png', name: 'My Profile', state: '/pages/profile', type: 'link' },
                    { icon: 'user-profile.png', name: `Users's Profile`, state: '/pages/user-profile', type: 'link' }
                ]
            },
            {
                name: 'DB Settings',
                description: 'DB Settings',
                type: 'link',
                icon: 'db-settings.png',
                state: '/uikits/db-switch'
            },
            {
                name: 'Patient Book',
                description: 'Patient list',
                type: 'link',
                icon: 'patient-list.png',
                state: '/uikits/tree-table'
            }
        ]
        this.originalMenu = [
            {
                name: 'Dashboard',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'dashboard.png',
                sub: [
                    { icon: 'i-Clock-3', name: 'Version 1', state: '/dashboard/v1', type: 'link' },
                    { icon: 'i-Clock-4', name: 'Version 2', state: '/dashboard/v2', type: 'link' },
                    { icon: 'i-Over-Time', name: 'Version 3', state: '/dashboard/v3', type: 'link' },
                    { icon: 'i-Clock', name: 'Version 4', state: '/dashboard/v4', type: 'link' },
                ]
            },
            {
                name: 'Patient List Book',
                description: 'Patient list',
                type: 'link',
                icon: 'patient-list.png',
                state: '/uikits/filter-table'
            },
            {
                name: 'Patient Book',
                description: 'Patient list',
                type: 'link',
                icon: 'patient-book.png',
                state: '/uikits/tree-table'
            },
            {
                name: 'Apps',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'i-Computer-Secure',
                sub: [
                    { icon: 'i-Add-File', name: 'Invoice Builder', state: '/invoice', type: 'link' },
                    { icon: 'i-Email', name: 'Inbox', state: '/inbox', type: 'link' },
                    { icon: 'i-Speach-Bubble-3', name: 'Chat', state: '/chat', type: 'link' },
                    { icon: 'i-Calendar', name: 'Calendar', state: '/calendar', type: 'link' },
                ]
            },
            {
                name: 'Forms',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'i-File-Clipboard-File--Text',
                sub: [
                    { icon: 'i-File-Clipboard-Text--Image', name: 'Basic components', state: '/forms/basic', type: 'link' },
                    { icon: 'i-Split-Vertical', name: 'Form layouts', state: '/forms/layouts', type: 'link' },
                    { icon: 'i-Receipt-4', name: 'Input Group', state: '/forms/input-group', type: 'link' },
                    { icon: 'i-File-Edit', name: 'Input Mask', state: '/forms/input-mask', type: 'link' },
                    { icon: 'i-Tag-2', name: 'Tag Input', state: '/forms/tag-input', type: 'link' },
                    { icon: 'i-Width-Window', name: 'Wizard', state: '/forms/wizard', type: 'link' },
                    { icon: 'i-Crop-2', name: 'Image Cropper', state: '/forms/img-cropper', type: 'link' },
                ]
            },
            {
                name: 'Data Tables',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'i-File-Horizontal-Text',
                sub: [
                    { icon: 'i-File-Horizontal-Text', name: 'List', state: '/tables/list', type: 'link' },
                    { icon: 'i-Full-View-Window', name: 'Fullscreen', state: '/tables/full', type: 'link' },
                    { icon: 'i-Code-Window', name: 'Paging', state: '/tables/paging', type: 'link' },
                    { icon: 'i-Filter-2', name: 'Filter', state: '/tables/filter', type: 'link' },
                ]
            },
            {
                name: 'Sessions',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'i-Administrator',
                sub: [
                    { icon: 'i-Add-User', name: 'Sign up', state: '/sessions/signup', type: 'link' },
                    { icon: 'i-Checked-User', name: 'Sign in', state: '/sessions/signin', type: 'link' },
                    { icon: 'i-Find-User', name: 'Forgot', state: '/sessions/forgot', type: 'link' }
                ]
            },
            {
                name: 'Profile',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'i-Windows-2',
                sub: [
                    { icon: 'i-Male', name: 'My Profile', state: '/pages/profile', type: 'link' },
                    { icon: 'i-Business-ManWoman', name: `Users's Profile`, state: '/pages/user-profile', type: 'link' }
                ]
            },
            {
                name: 'Icons',
                description: '600+ premium icons',
                type: 'link',
                icon: 'i-Cloud-Sun',
                state: '/icons/iconsmind'
            },
            {
                name: 'Others',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                type: 'dropDown',
                icon: 'i-Double-Tap',
                sub: [
                    { icon: 'i-Error-404-Window', name: 'Not found', state: '/others/404', type: 'link' }
                ]
            },
            {
                name: 'Doc',
                type: 'extLink',
                tooltip: 'Documentation',
                icon: 'i-Safe-Box1',
                state: 'http://demos.ui-lib.com/gull-doc'
            }
        ]

        // console.log("this._globalService.getCurrentUser():", this._globalService.getCurrentUser())
        // this.userType = this._globalService.getCurrentUser().role;
        // console.log("this.userType:", this.userType)
    }
    
    // sets iconMenu as default;
    
    menuItems = new BehaviorSubject<IMenuItem[]>(this.originalMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();
    // You can customize this method to supply different menu for
    // different user type.
    publishNavigationChange(menuType: string) {
        switch (menuType) {
            case 'ADMIN':
                this.menuItems.next(this.adminUserMenu);
                break;
            case 'USER':
                this.menuItems.next(this.userMenu);
                break;
            default:
                this.menuItems.next(this.originalMenu);
        }
    }
}
