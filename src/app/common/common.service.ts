import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './app.static.settings';

@Injectable()
export class CommonService {
    constructor(private http: HttpClient) {}

    deptList() {
        return this.http.get<any>('department')
    }

    desigList() {
        return this.http.get<any>('designation')
    }

    itemList() {
        return this.http.get<any>('item')
    }

    stateList() {
        return this.http.get<any>('state')
    }

    getDailyInvoice(obj){
        return this.http.post<any>('invoice/list', obj)
    }

    backgroundSearch(obj){
        return this.http.post<any>(AppSettings.BACKGROUND_CALL+'/invoice/list', obj)
    }

    getGSTInvoice(id, fromDate, toDate, mobile) : Observable<any>{
        return this.http.get('invoice/gstExcel?billId='+id+'&fromDate='+fromDate+'&toDate='+toDate+'&mobile='+mobile, {responseType: 'blob'})
    }
    
    printBase64(base64){
        return this.http.post<any>(AppSettings.BACKGROUND_CALL+'/invoice/printImage', base64)
    }

    printBarcode(base64){
        return this.http.post<any>('invoice/printBarcode', base64)
    }

    backup() {
        return this.http.get<any>('dashboard/backup')
    }

    delete(id){
        return this.http.delete<any>('invoice/'+id)
    }

    deleteItem(billId, itemId){
        return this.http.delete<any>('invoice/deleteItem?billId='+billId+"&itemId="+itemId)
    }

    updateRemark(billId, remarks){
        return this.http.put<any>('invoice/'+billId+'?remark='+remarks, {})
    }
}