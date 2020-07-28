import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-tracking',
  templateUrl: './report-tracking.component.html',
  styleUrls: ['./report-tracking.component.scss']
})
export class ReportTrackingComponent implements OnInit {
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
      { field: 'filename', header: 'File name', width: '300px', filterMatchMode: 'contains' },
      { field: 'patientid', header: 'Patient Id', width: '150px', filterMatchMode: 'contains' },
      { field: 'firstname', header: 'First name', width: '125px', filterMatchMode: 'contains' },
      { field: 'lastname', header: 'Last name', width: '125px', filterMatchMode: 'contains' },
      { field: 'createddt', header: 'Operation Dt', width: '145px', filterMatchMode: 'contains' },
      { field: 'lookup', header: 'Lookup', width: '125px', filterMatchMode: 'contains' },
      { field: 'datapresent', header: 'Data present', width: '130px', filterMatchMode: 'contains' },
      { field: 'mailsent', header: 'Mail sent', width: '110px', filterMatchMode: 'contains' },
    ];
    this.searchPatient()
    

  }

  searchPatient() {
    this.showLoading = true;
    var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.reportService.getReports(date1, date2).subscribe((res: any) => {
      this.products = res.data;
      this.products.map(item => {
        item.filename = item.filename.substring(1)
        item.createddt = this.datePipe.transform(item.createddate, 'yyyy-MM-dd HH:mm')
        item.lookup = item.lookup == 1 ? 'Success' : 'Fail'
      })
      this.products = [...this.products]
      this.showLoading = false;
    })
  }
}
