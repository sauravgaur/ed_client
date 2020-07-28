import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  getReports1() {
    return this.http.get('trackReport');
  }

  getReports(fromDate, toDate) {
    return this.http.get('trackReport?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  getPublicDomainList(fromDate, toDate) {
    return this.http.get('publicDomainList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  getLookupFailed(fromDate, toDate) {
    return this.http.get('lookupFailedList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  getDischargeList(fromDate, toDate) {
    return this.http.get('dischargedPatientList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  newAdmissionsList(fromDate, toDate) {
    return this.http.get('newAdmissionList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  getPatientCountDetailForHeader(){
    return this.http.get('getReports');
  }

  getEmailQueue(fromDate, toDate) {
    return this.http.get('emailQueList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

}
