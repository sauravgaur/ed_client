import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-public-domain',
  templateUrl: './report-public-domain.component.html',
})
export class ReportPublicDomainComponent implements OnInit {
  products;
  filteredProducts;
  datePipe = new DatePipe("en-US");
  cols: any[] = []
  constructor(
    private reportService: ReportService,
    private _toasterService: ToastrService
  ) { }
  rangeDates: any[] = []
  showLoading: boolean = false;
  maxDate: Date;
  minDate: Date;
  ngOnInit() {
    this.maxDate = new Date();
    var newDt = new Date()
    newDt.setMonth(newDt.getMonth() - 24)
    this.minDate = newDt
    
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7)
    this.rangeDates = [weekAgo, new Date()]
    this.cols = [
      // { field: 'gender', header: 'Gender' },
      { field: 'filename', header: 'File name', width: '320px', filterMatchMode: 'contains' },
      { field: 'patientid', header: 'Patient Id', width: '150px', filterMatchMode: 'contains' },
      { field: 'firstname', header: 'First name', width: '125px', filterMatchMode: 'contains' },
      { field: 'lastname', header: 'Last name', width: '125px', filterMatchMode: 'contains' },
      { field: 'createddt', header: 'Operation Dt', width: '170px', filterMatchMode: 'contains' },
      { field: 'emailToEdit', header: 'Email To', width: '220px', filterMatchMode: 'contains' },
      { field: 'mailsent', header: 'Mail sent', width: '130px', filterMatchMode: 'contains' },
    ];
    this.searchPatient()
    

  }

  searchPatient() {
    this.showLoading = true;
    var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.reportService.getPublicDomainList(date1, date2).subscribe((res: any) => {
      this.products = res.data;
      this.products.map(item => {
        item.filename = item.filename.substring(1)
        var emailToAddr = item.emailto ? item.emailto.trim() : ''
        item.emailToEdit = emailToAddr ? emailToAddr.substring(emailToAddr.indexOf('<') + 1, emailToAddr.length - 1) : 'Not found'

        item.createddt = this.datePipe.transform(item.createddate, 'yyyy-MM-dd HH:mm:ss')
      })
      this.products = [...this.products]
      // console.log("pduruct in pubilc domain", this.products)
      this.showLoading = false;
    })
  }
}
