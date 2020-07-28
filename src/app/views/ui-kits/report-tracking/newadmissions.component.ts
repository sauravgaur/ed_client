import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from 'src/app/common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { ReportService } from 'src/app/shared/services/report.service';

@Component({
  selector: 'app-newadmissions',
  templateUrl: './newadmissions.component.html',
  styles: [
    '.icon {height: 10px; width: 10px; }',
    '.disabled {opacity: 0.5; }'
  ],
})
export class NewadmissionsComponent implements OnInit {
 
  constructor(
    private reportService: ReportService,
  ) {
  }
  editing = {};
  cols: any[] = []
  rangeDates: any[] = []
  showLoading: boolean = false;
  products;
  datePipe = new DatePipe("en-US");
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
      { field: 'pid_patient_name', header: 'Patient name', width: '250px', filterMatchMode: 'contains' },
      { field: 'patient_id', header: 'Patient Id', width: '150px', filterMatchMode: 'contains' },
      // { field: 'pcp_pd_npi', header: 'NPI', width: '135px', filterMatchMode: 'contains' },
      {field: 'evn_recorded_date_time', header: 'Event Date', width: '170px',  filterMatchMode: 'contains' },
      { field: 'msh_system_location', header: 'ED Facility', width: '170px', filterMatchMode: 'contains' },
      { field: 'primary_insurance_id', header: '#Insurance', width: '135px', filterMatchMode: 'contains' },
      { field: 'pd1_provider_name', header: 'Provider', width: '200px', filterMatchMode: 'contains' },
      // { field: 'dischargeDt', header: 'Discharge Dt', width: '150px', filterMatchMode: 'contains' },
    ];
    this.searchPatient()
  }

  searchPatient() {
    this.showLoading = true;
    var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.reportService.newAdmissionsList(date1, date2).subscribe((res: any) => {
      this.products = res.data;
      this.products.map(item => {
        item.msh_system_location = item.msh_from_location +" "+ item.msh_from_system
        item.evn_recorded_date_time = item.evn_recorded_date_time ? this.datePipe.transform(item.evn_recorded_date_time, 'yyyy-MM-dd HH:mm:ss') : ''
      })
      this.products = [...this.products]
      // console.log("products:", this.products)
      this.showLoading = false;
    })
  }

}
