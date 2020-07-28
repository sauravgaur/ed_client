import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-email-tracking',
  templateUrl: './email-tracking.component.html',
})
export class EmailTrackingComponent implements OnInit {
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
      { field: 'filename', header: 'File name', width: '300px', filterMatchMode: 'contains' },
      { field: 'patientid', header: 'Patient Id', width: '130px', filterMatchMode: 'contains' },
      { field: 'name', header: 'Patient name', width: '170px', filterMatchMode: 'contains' },
      { field: 'createddt', header: 'Operation Date', width: '170px', filterMatchMode: 'contains' },
      { field: 'emailToEdit', header: 'Mail to', width: '220px', filterMatchMode: 'contains' },
      { field: 'mailsent', header: 'Mail sent', width: '120px', filterMatchMode: 'contains' },
      { field: 'emailtried', header: '#Email', width: '120px', filterMatchMode: 'contains' },
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
        item.createddt = this.datePipe.transform(item.createddate, 'yyyy-MM-dd HH:mm:ss')
        item.name = item.firstname + " " + item.lastname
        var emalAddr = item.emailto ? item.emailto.trim() : ''
        item.emailToEdit = emalAddr ? emalAddr.substring(emalAddr.indexOf('<') + 1, emalAddr.length - 1) : 'Not found'
        item.mailsent = item.mailsent ? item.mailsent : 'NO'
        item.emailtried = item.emailtried ? item.emailtried : 'NO'
      })
      this.products = [...this.products]
      this.showLoading = false;
    })
  }

  reSendEmail(event, overlaypanel: OverlayPanel){
    overlaypanel.toggle(event);
  }
}
