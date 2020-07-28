import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
// import { AuthJwtHTTP } from '../auth.jwt.http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from './app.static.settings';
import { LOCAL_STORAGE_KEYS } from '../enum/go.enum';
// import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_authService/authentication.service';
import { NotifyService } from '../common/notify.service';
// import { SelectItem } from 'primeng/api';

@Injectable()
export class GlobalService {
    requestedCount: number = 0;
    constructor(
        private _notifyService: NotifyService,
        private _http: HttpClient,
        private _authenticationService: AuthenticationService
    ) {

    }
    initializePaginationParams() {
        return {
            page: AppSettings.PAGE_PAGE,
            total: AppSettings.PAGE_TOTAL,
            currentPage: AppSettings.PAGE_CURRENT_PAGE,
            limit: AppSettings.PAGE_DATA_LIMIT,
        }
    }

    isLoggedIn(){
        return this._authenticationService.isLoggedIn()
    }

    initializePaginationParam() {
        return {
            rows: AppSettings.PAGE_DATA_LIMIT,
            totalRecords: AppSettings.PAGE_TOTAL
        }
    }

    getRoleList(roleFor) {
        return this._http.get('user/rolesForCreateUser?roleFor=' + roleFor);
    }

    getCurrentUserAccountId() {
        return this.getCurrentUser().user.accountId._id;
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.CURRENT_USER]));
    }

    // getAllEmployee() {
    //     var lst: SelectItem[] = []
    //     var empLst = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.EMPLOYEE_LIST]));
    //     empLst.forEach(element => {
    //         lst.push({label: element.empFirstName + " - "+ element.designation.designationName + " - " + element.department.deptName, value: element})
    //     });
    //     return lst
    // }

    getBusinessTypeList() {
        return this._http.get('businessType/list');
    }

    getAccountTypeList() {
        return this._http.get('accountType/list');
    }

    getAllCheckedValues(items) {
        return items.filter(function (item) { return item.checked == true });
    }

    addCheckedPropertyToEach(values, val = false) {
        return values.map(function (item) {
            item.checked = val;
            return item;
        })
    }


    getCRUDAccess() {
        // return this._http.getLocalFile('assets/data/access_rights.json');
    }

    getCardStampApproval()
    {
        // return this._http.getLocalFile('assets/data/card_stamp_approval.json');
    }

    getRoleDetails() {
        // return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.USER_ROLE_DETAILS]));
    }

    getUserRoleIds() {
        // return this.getRoleDetails().map(function (obj) { return obj.role });
    }

    hasFormError(formGroup, isFormSubmitted, fieldName, errorType) {
        var formControl = formGroup.get(fieldName);
        var controlChanged = (formControl.touched || isFormSubmitted);
        if (controlChanged && errorType instanceof Array) {
            var orCondition = false;
            errorType.forEach(element => {
                orCondition = orCondition || formControl.hasError(element)
                if (orCondition) return;
            });
            return controlChanged && orCondition;
        }
        return controlChanged && (formControl.hasError(errorType));
    }

    // dateValidate(formGroup, sourceField, dependentField, errorType) {
    //     var fromDate = formGroup.get(sourceField).value;
    //     var toDate = formGroup.get(dependentField).value;

    //     if (!fromDate || !toDate)
    //         return false;

    //     var fromDateObj = fromDate ? this.getDateObject(this.convertDatePickerToDateDDMMYYYY(fromDate), "DD-MM-YYYY") : null;
    //     var toDateObj = toDate ? this.getDateObject(this.convertDatePickerToDateDDMMYYYY(toDate), "DD-MM-YYYY") : null;

    //     if (errorType == "gt") {
    //         if (fromDateObj.getTime() >= toDateObj.getTime()) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     } else if (errorType == "lt") {
    //         if (fromDateObj.getTime() <= toDateObj.getTime()) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     }
    // }

    getPaginationParams(pagination) {
        var offset = 0
        if (pagination.page > 1) {
            offset = (pagination.page - 1) * AppSettings.PAGE_DATA_LIMIT;
        }
        return 'offset=' + (offset + 1) + '&max=' + pagination.limit + '&rows=' + pagination.total;
    }

    getPaginationParamsObject(pagination) {
        var offset = 0
        if (pagination.page > 1) {
            offset = (pagination.page - 1) * AppSettings.PAGE_DATA_LIMIT;
        }
        return { offset: offset + 1, max: pagination.limit, rows: pagination.total };
    }

    // dateFormat(date) {
    //     if (!date)
    //         return '';
    //     var convertedDate = moment(date);
    //     return convertedDate.format('DD-MM-YYYY');
    // }

    // dateFormatWithFormatter(date, format) {
    //     if (!date)
    //         return '';
    //     var convertedDate = moment(date);
    //     return convertedDate.format(format);
    // }

    // convertDateFormat(dateStr, fromFormat, toFormat) {
    //     var convertedDate = moment(dateStr, fromFormat);
    //     return convertedDate.format(toFormat);
    // }

    // getDateObject(dateStr, dateFormat) {
    //     var convertedDate = dateFormat ? moment(dateStr, dateFormat) : moment(dateStr);
    //     return convertedDate.toDate();
    // }

    clearTime = function (date) {
        if (date)
            date.setHours(0, 0, 0, 0);
        return date;
    }

    getDateForDatePicker(timeStamp) {
        if (timeStamp) {
            var dateObj = new Date(timeStamp)
            return {
                date: {
                    year: dateObj.getFullYear(),
                    month: dateObj.getMonth() + 1,
                    day: dateObj.getDate()
                }
            }
        } else {
            return '';
        }
    }

    convertDatePickerToDateYYYYDDMM(datePickerObj) {
        if (datePickerObj) {
            var month = datePickerObj.date.month > 9 ? (datePickerObj.date.month) : ("0" + datePickerObj.date.month);
            var day = datePickerObj.date.day > 9 ? (datePickerObj.date.day) : ("0" + datePickerObj.date.day);
            return datePickerObj.date.year + "-" + month + "-" + day;
        } else {
            return "";
        }
    }

    convertDatePickerToDateYYYYDDMM1(datePickerObj) {
        if (datePickerObj) {
            var month = datePickerObj.month > 9 ? (datePickerObj.month) : ("0" + datePickerObj.month);
            var day = datePickerObj.day > 9 ? (datePickerObj.day) : ("0" + datePickerObj.day);
            return datePickerObj.year + "-" + month + "-" + day;
        } else {
            return "";
        }
    }

    convertStringToDate(e) {
        e = e.split('-');
        let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
        return new Date().setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }

    convertDatePickerToDateDDMMYYYY(datePickerObj) {
        if (datePickerObj) {
            var month = datePickerObj.date.month > 9 ? (datePickerObj.date.month) : ("0" + datePickerObj.date.month);
            var day = datePickerObj.date.day > 9 ? (datePickerObj.date.day) : ("0" + datePickerObj.date.day);
            return day + "-" + month + "-" + datePickerObj.date.year;
        } else {
            return "";
        }
    }

    getDatePickerConfiguration(isBackwardEnabled = true, isFutureEnabled = true) {
        var date = new Date();
        var backwardDate = { year: 0, month: 0, day: 0 };
        var forwardDate = { year: 0, month: 0, day: 0 };

        if (isBackwardEnabled == false) {
            backwardDate.year = date.getFullYear(),
                backwardDate.month = date.getMonth() + 1,
                backwardDate.day = date.getDate() - 1
        }

        if (isFutureEnabled == false) {
            forwardDate.year = date.getFullYear(),
                forwardDate.month = date.getMonth() + 1,
                forwardDate.day = date.getDate() + 1
        }

        return {
            // other options...
            editableDateField: false,
            dateFormat: 'dd-mm-yyyy',
            width: "100%",
            componentDisabled: false,
            disableUntil: backwardDate,
            disableSince: forwardDate,
        };
    }

    // getIsGoAdmin() {
    //     return (this.getRoleDetails()[0].role == APP_ROLE.GO_ADMIN);
    // }

    commentNotificationObj(commentObj) {
        var link = environment.LOCAL_CONTEXT + 'approval'
        // var template = `<div><a href="${link}"> ${commentObj.issueId} </a></div><div>${commentObj.title}</div><br>
        //                 <div> ${commentObj.user.name} </div><div>${commentObj.comment}</div><br>`;
        var syntex = { isAre: commentObj.count > 1 ? 'are ' : 'is ', multiple: commentObj.count > 1 ? 's' : '' }
        var template = "There " + syntex.isAre + commentObj.count + " unread Comment" + syntex.multiple + ".";
        let options = { //set options
            body: template,
            icon: "assets/content/images/admin-logo-single.png", //adding an icon
            tag: "Issue Tracker Comment",
            requireInteraction: false
        }
        return options;
    }

    notificationObj(count) {
        var syntex = { isAre: count > 1 ? 'are ' : 'is ', multiple: count > 1 ? 's' : '' }
        var template = "There " + syntex.isAre + count + " Issue" + syntex.multiple + " need your approval.";
        let options = { //set options
            body: template,
            icon: "assets/content/images/admin-logo-single.png", //adding an icon
            tag: "Issue Tracker",
            requireInteraction: false
        }
        return options;
    }

    randomNumber() {
        return Math.floor(Math.random() * 100);
    }

    isImage(mimeType) {
        if (mimeType.match(/^image.*$/)) {
            return false;
        } else return true;
    }

    setSelectedLanguage(selectedLanguage) {
        // localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.SELECTED_LANGUAGE], JSON.stringify(selectedLanguage));
    }

    getSelectedLanguage() {
        // let selectedLanguage = localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.SELECTED_LANGUAGE]);
        // return selectedLanguage === "undefined" ? null : JSON.parse(selectedLanguage);
    }

    saveFcmToken() {
        var fcmToken = localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.FCM_TOKEN])
        if (localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.token]) && fcmToken) {
            // console.log("in save fcm", fcmToken)
            this._http.post('fcm/register', { fcmToken: fcmToken }).subscribe();
            return true;
        }
    }

    setEmployeeList(empLst) {
        var employeeList = []
        empLst.forEach(element => {
            employeeList.push({ value: element.id, label: element.name })
        });
        // localStorage.setItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.EMPLOYEE_LIST], JSON.stringify(employeeList));
    }

    getEmployeeList() {
        // return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS[LOCAL_STORAGE_KEYS.EMPLOYEE_LIST]));
    }

    // public startRequest() {
    //     if (this.requestedCount == 0) {
    //         this._notifyService.setLoaderResponse(true);
    //     }
    //     this.requestedCount++;
    // }

    // public endRequest() {
    //     this.requestedCount--;
    //     if (this.requestedCount == 0) {
    //         setTimeout(() =>
    //             this._notifyService.setLoaderResponse(false)
    //             , 100);
    //     }
    // }
}