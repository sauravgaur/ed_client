import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  dashboardCount(){
    return this.http.get('dashboardCount');
  }

  getMonthlyChartBar(){
    return this.http.get('monthlyReport');
  }

  getWeeklyChartBar(){
    return this.http.get('weeklyReport');
  }

  getDailyChartBar(){
    return this.http.get('dailyReport');
  }

  facilityWiseReport(){
    return this.http.get('facilityWiseReport');
  }
  
  past3MonthReVisitCount(){
    return this.http.get('past3MonthReVisitCount')
  }

  lastNoteUpdated(){
    return this.http.get('lastNoteUpdated')
  }

  last7DaysFeeds(){
    return this.http.get('last7DaysFeeds')
  }

  insuranceCompanyWiseReport(){
    return this.http.get('primaryInsuranceCompWiseReport');
  }

  last12HourFeed(){
    return this.http.get('last12HourFeed');
  }
  
  getProducts() {
    return this.http.get('patientList');
  }

  childPatientList(id, patientId, fromDate, toDate){
    return this.http.get('childPatientList?id='+id+'&patientId='+patientId+'&fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997")
  }

  getDateRangeAuditList(fromDate, toDate) {
    return this.http.get('filterAuditLog?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  multiplelookup(){
    return this.http.get('getMultipleLookupFound');
  }

  uniquePatientList(fromDate, toDate) {
    return this.http.get('uniquePatientList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  getDateRangePatientList(fromDate, toDate) {
    return this.http.get('filterPatientList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  getDateRangeFeedList(fromDate, toDate) {
    return this.http.get('getDateRangeFeedList?fromDate='+fromDate +" 00:00:00.000"+'&toDate='+toDate+" 23:59:59.997");
  }

  updateNote(id, note) {
    return this.http.put('updatePatientNote', {id: id, note: note});
  }

  getAuditList() {
    return this.http.get('auditLog');
  }

  getDbConfig() {
    return this.http.get('databaseDetail');
  }

  updatePrimaryDbConfig(primaryDb) {
    return this.http.post('updatePrimaryDb', primaryDb);
  }

  updateSecondaryDbConfig(secondaryDb) {
    return this.http.post('updateSecondaryDb', secondaryDb);
  }

  switchDB(primaryDb, secondaryDb) {
    return this.http.post('switchDb', {primary: primaryDb, secondary: secondaryDb});
  }
}
