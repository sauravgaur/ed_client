import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
})
export class AuditLogComponent implements OnInit {
  products;
  datePipe = new DatePipe("en-US");
  cols: any[] = []
  constructor(
    private productService: ProductService,
    private _toasterService: ToastrService,
  ) {
  }
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
      { field: 'username', header: 'Username', width: '250px', filterMatchMode: 'contains'},
      { field: 'firstname', header: 'First name', width: '135px', filterMatchMode: 'contains'},
      { field: 'lastname', header: 'Last name', width: '250px', filterMatchMode: 'contains'},
      { field: 'activity', header: 'Activity', width: '135px', filterMatchMode: 'contains'},
      { field: 'dateTm', header: 'Date Time', width: '150px', filterMatchMode: 'contains'},
    ];
    this.searchAuditLog()
  }

  searchAuditLog() {
    this.showLoading = true;
    var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.productService.getDateRangeAuditList(date1, date2).subscribe((res: any) => {
      this.products = [...res.data];
      this.products.map(item =>{
        item.dateTm = this.datePipe.transform(item.datetime, 'yyyy-MM-dd HH:mm:ss')
      })
      console.log("products:", this.products)
      this.showLoading = false;
    })
  }

}
