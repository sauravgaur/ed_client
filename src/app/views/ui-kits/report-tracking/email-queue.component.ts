import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-email-queue',
  templateUrl: './email-queue.component.html',
})
export class EmailQueueComponent implements OnInit {
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
      { field: 'emailFromEdit', header: 'From Email', width: '250px', filterMatchMode: 'contains' },
      { field: 'emailToEdit', header: 'To Email', width: '250px', filterMatchMode: 'contains' },
      { field: 'subject', header: 'Subject', width: '135px', filterMatchMode: 'contains' },
      { field: 'createddt', header: 'Date', width: '150px', filterMatchMode: 'contains' },
      { field: 'email_type', header: 'Email Type', width: '180px', filterMatchMode: 'contains' },
      { field: 'hasAttachments', header: 'Attachments', width: '125px', filterMatchMode: 'contains' },
      { field: 'attempt', header: 'Attempts', width: '120px', filterMatchMode: 'contains' },
    ];
    this.searchPatient()
  }

  searchPatient() {
    this.showLoading = true;
    var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.reportService.getEmailQueue(date1, date2).subscribe((res: any) => {
      this.products = res.data;
      this.products.map(item => {
        var emalToAddr = item.to_email ? item.to_email.trim() : ''
        item.emailToEdit = emalToAddr ? emalToAddr.substring(emalToAddr.indexOf('<') + 1, emalToAddr.length - 1) : 'Not found'

        var emalFrmAddr = item.from_email ? item.from_email.trim() : ''
        item.emailFromEdit = emalFrmAddr ? emalFrmAddr.substring(emalFrmAddr.indexOf('<') + 1, emalFrmAddr.length - 1) : 'Not found'
        
        item.createddt = this.datePipe.transform(item.createddate, 'yyyy-MM-dd HH:mm')
        item.hasAttachments = item.attachments ? "Yes" : "No";
        item.email_type = this.getEmailType(item.email_type);
      })
      this.products = [...this.products]
      this.showLoading = false;
    })
  }

  reSendEmail(event, overlaypanel: OverlayPanel){
    overlaypanel.toggle(event);
  }

  getEmailType(type) {
    switch(type) {
      case 1:
        return "Password Mail";
      case 2:
        return "PDF Mail";
    }

    return "Other Mail";
  }
}
