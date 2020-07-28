import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-db-switch',
  templateUrl: './db-switch.component.html'
})
export class DbSwitchComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  editFlg1: boolean = false;
  editFlg2: boolean = false;
  columns = [
    { name: 'Name' },
    { name: 'Facility' },
    { name: 'Insurance' }
  ];
  datePipe = new DatePipe("en-US");
  constructor(
    private productService: ProductService,
    private _toasterService: ToastrService,
    calendar: NgbCalendar
  ) {
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', -7);
    this.toDate = calendar.getToday();
  }
  editing = {};
  loading: boolean = false;
  loadingText: string;

  loading1: boolean = false;
  loadingText1: string;

  loading2: boolean = false;
  loadingText2: string;

  primaryDb: any = {};
  secondaryDb: any = {};
  emptyDb: any;
  dbDetail: any[] = []

  primaryDbEdit: any;
  secondaryDbEdit: any;
  ngOnInit() {
    this.productService.getDbConfig()
      .subscribe((res: any) => {
        this.dbDetail = [...res.data];

        this.primaryDb = this.dbDetail.find(item => item.dbtype == 'primary')
        this.secondaryDb = this.dbDetail.find(item => item.dbtype == 'secondary')
        this.primaryDbEdit = Object.assign({}, this.primaryDb);
        this.secondaryDbEdit = Object.assign({}, this.secondaryDb);
      });
  }

  switch() {
    if (!this.loading) {
      this.loading = true;
      this.loadingText = 'Switching DB';
      this.productService.switchDB(this.primaryDb, this.secondaryDb)
        .subscribe((res: any) => {
          if (res.status == 'success') {
            this.emptyDb = Object.assign({}, this.primaryDb);
            this.primaryDb = Object.assign({}, this.secondaryDb);
            this.secondaryDb = Object.assign({}, this.emptyDb);
            this.primaryDbEdit = Object.assign({}, this.primaryDb);
            this.secondaryDbEdit = Object.assign({}, this.secondaryDb);
            this._toasterService.success('Operation Successfull !!', 'Switch Database', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
          } else {
            this._toasterService.success('Operation fail !!', 'Switch Database', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
          }
          this.loading = false;
        })
    }
  }

  edit1() {
    this.editFlg1 = true;
    this.primaryDbEdit = Object.assign({}, this.primaryDb);
    this.primaryDbEdit.password = ''
  }

  update1() {
    this.loading1 = true;
    this.loadingText1 = 'Updating Datasource';
    this.productService.updatePrimaryDbConfig(this.primaryDbEdit)
      .subscribe((res: any) => {
        if (res.status == 'success') {
          this.primaryDb = Object.assign({}, this.primaryDbEdit)
          this._toasterService.success(res.message, 'Update Datasource', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
        } else this._toasterService.error(res.message, 'Update Datasource', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
        this.editFlg1 = false;
        this.loading1 = false;
      })
  }

  cancel1() {
    this.editFlg1 = false;
    this.primaryDbEdit = Object.assign({}, this.primaryDb);
    this.primaryDbEdit.password = ''
  }

  edit2() {
    this.editFlg2 = true;
    this.secondaryDbEdit = Object.assign({}, this.secondaryDb);
    this.secondaryDbEdit.password = ''
  }

  update2() {
    this.loading2 = true;
    this.loadingText2 = 'Updating Datasource';
    this.productService.updateSecondaryDbConfig(this.secondaryDbEdit)
      .subscribe((res: any) => {
        if (res.status == 'success') {
          this.secondaryDb = Object.assign({}, this.secondaryDbEdit)
          this._toasterService.success(res.message, 'Update Datasource', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
        } else this._toasterService.error(res.message, 'Update Datasource', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
        this.editFlg2 = false;
        this.loading2 = false;
      })
  }

  cancel2() {
    this.editFlg2 = false;
    this.secondaryDbEdit = Object.assign({}, this.secondaryDb);
    this.secondaryDbEdit.password = ''
  }
}
