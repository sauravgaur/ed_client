import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from '../../../common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as cloneDeep from 'lodash/cloneDeep';
// const FilterUtils = require('primeng/components/utils/filterutils').FilterUtils;

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: []
})
export class FilterTableComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products;
  filteredProducts;
  showLoading: boolean = true;

  datePipe = new DatePipe("en-US");
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  constructor(
    private productService: ProductService,
    private _toasterService: ToastrService,
  ) {
  }
  editing = {};
  cars: any[];
  cols: any[];
  yearTimeout: any;
  ngOnInit() {
  //   FilterUtils['custom'] = (value, filter): boolean => {
  //     if (filter === undefined || filter === null || filter.trim() === '') {
  //         return true;
  //     }

  //     if (value === undefined || value === null) {
  //         return false;
  //     }
      
  //     return parseInt(filter) > value;
  // }
    this.maxDate = new Date();
    var newDt = new Date()
    newDt.setMonth(newDt.getMonth() - 24)
    this.minDate = newDt
    
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7)
    this.rangeDates = [weekAgo, new Date()]
    this.cols = [
      // { field: 'gender', header: 'Gender' },
      { field: 'pid_patient_name', header: 'Patient Name', width: '220px', filterMatchMode: 'contains' },
      { field: 'patient_id', header: 'Patient Id', width: '150px', filterMatchMode: 'contains' },
      { field: 'visitDate', header: 'Event Date', width: '170px', filterMatchMode: 'contains' },
      { field: 'event_desc', header: 'Event Type' , width: '250px', filterMatchMode: 'contains'},
      { field: 'pcp_pd_npi', header: 'NPI', width: '135px', filterMatchMode: 'contains' },
      { field: 'msh_system_location', header: 'ED Facility', width: '150px', filterMatchMode: 'contains' },
      // { field: 'evn_type_facility', header: 'ED Facility', width: '150px', filterMatchMode: 'contains' },
      // { field: 'primary_insurance_company', header: 'Ins. Comp.', width: '150px', filterMatchMode: 'contains'},
      { field: 'pd1_provider_name', header: 'Provider', width: '200px', filterMatchMode: 'contains' },
      { field: 'note', header: 'Note', width: '300px', filterMatchMode: 'contains' },
    ];
    
    this.searchPatient()
  //   this.cars = [
  //     {vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black'},
  //     {vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White'},
  //     {vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue'},
  //     {vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White'},
  //     {vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red'},
  //     {vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue'},
  //     {vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow'},
  //     {vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown'},
  //     {vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black'}
  // ];
  }

  updateValue(event) {
    // console.log('inline editing rowIndex', event)
    var oldNote = this.filteredProducts.find(itm => itm.id == event.data.id).note
    if(oldNote != event.data.note){
        this.productService.updateNote(event.data.id, event.data.note)
        .subscribe((res: any) => {
          // console.log("after update")
          if(res.status == AppSettings.STATUS_SUCCESS){
            this.filteredProducts = cloneDeep(this.products)
            this._toasterService.success('Update successfully !!', 'Patient Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
          }else{
            event.data.note = oldNote
            this._toasterService.error('Update failed !!', 'Patient Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
          } 
        });
    }
    // if (this.products[rowIndex][cell] != event.target.value.trim()) {
    //   var id = this.products[rowIndex].id
    //   this.productService.updateNote(id, event.target.value)
    //     .subscribe((res: any) => {
    //       // console.log("after update")
    //       this._toasterService.success('Update successfully !!', 'Patient Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
    //     });
    //   this.products[rowIndex][cell] = event.target.value;
    //   this.products = [...this.products];
    // }
    // this.editing[rowIndex + '-' + cell] = false;
  }

  // updateValue(event, cell, rowIndex) {
  //   console.log('inline editing rowIndex', event, rowIndex, cell)
  //   if (this.products[rowIndex][cell] != event.target.value.trim()) {
  //     var id = this.products[rowIndex].id
  //     this.productService.updateNote(id, event.target.value)
  //       .subscribe((res: any) => {
  //         // console.log("after update")
  //         this._toasterService.success('Update successfully !!', 'Patient Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
  //       });
  //     this.products[rowIndex][cell] = event.target.value;
  //     this.products = [...this.products];
  //   }
  //   this.editing[rowIndex + '-' + cell] = false;
  // }

  searchPatient() {
    this.showLoading = true;
    var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.productService.getDateRangePatientList(date1, date2).subscribe((res: any) => {
      this.products = res.data;
      this.products.map(item => {
        item.visitDate = this.datePipe.transform(item.evn_recorded_date_time, 'yyyy-MM-dd HH:mm:ss')
        item.msh_system_location = item.msh_from_location +" "+ item.msh_from_system
      })
      this.products = [...this.products]
      this.filteredProducts = cloneDeep(this.products)
      this.showLoading = false;
    })
  }
}
