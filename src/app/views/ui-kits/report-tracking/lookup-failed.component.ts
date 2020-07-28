import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-lookup-failed',
  templateUrl: './lookup-failed.component.html',
})
export class LookupFailedComponent implements OnInit {
  products;
  datePipe = new DatePipe("en-US");
  constructor(
    private reportService: ReportService,
    private _toasterService: ToastrService
  ) { }
  editing = {};
  cols: any[] = []
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
      { field: 'filename', header: 'File name', width: '320px', filterMatchMode: 'contains' },
      { field: 'patientid', header: 'Patient Id', width: '150px', filterMatchMode: 'contains' },
      { field: 'firstname', header: 'Patient name', width: '180px', filterMatchMode: 'contains' },
      { field: 'lastname', header: 'Last name', width: '180px', filterMatchMode: 'contains' },
      { field: 'createddt', header: 'Operation Dt.', width: '170px', filterMatchMode: 'contains' },
      // { field: 'lookup', header: 'Lookup', width: '135px', filterMatchMode: 'contains' },
    ];
    this.searchPatient()
  }

  searchPatient() {
    this.showLoading = true;
    var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.reportService.getLookupFailed(date1, date2).subscribe((res: any) => {
      this.products = res.data;
      this.products.map(item => {
        item.filename = item.filename.substring(1)
        item.createddt = this.datePipe.transform(item.createddate, 'yyyy-MM-dd HH:mm:ss')
        item.lookup = item.lookup == 1 ? 'Success' : 'Fail'
      })
      this.products = [...this.products]
      this.showLoading = false;
    })
  }

  reSendEmail(event, overlaypanel: OverlayPanel){
    overlaypanel.toggle(event);
  }
}
