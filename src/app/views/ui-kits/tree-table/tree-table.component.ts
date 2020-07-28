import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AppSettings } from '../../../common/app.static.settings';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  encapsulation: ViewEncapsulation.None,
  // styles: [
  //   '.icon {height: 10px; width: 10px; }',
  //   '.disabled {opacity: 0.5; }'
  // ],

  // .note-class{
  //   width: 20% !important;
  // }

  styles: [`
      
      .treeTable tr:hover {
        background-color: #ecefee !important;
      }
      .treeTable th:hover {
        background-color: #ecefee !important;
      }
      .treeTable tr{
        line-height: 2em;
      }
        :host ::ng-deep .priority-2,
        :host ::ng-deep .priority-3,
        :host ::ng-deep .visibility-sm {
            display: none;
        }

        @media screen and (max-width: 39.938em) {
            :host ::ng-deep .visibility-sm {
                display: inline;
            }
        }

        @media screen and (min-width: 40em) {
            :host ::ng-deep .priority-2 {
                display: table-cell;
            }
        }

        @media screen and (min-width: 64em) {
            :host ::ng-deep .priority-3 {
                display: table-cell;
            }
        }
    `]
})
export class TreeTableComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products: any[] = []
  loading: boolean = false;
  files: TreeNode[] = [];
  cloneData: any[] = []
  filteredProducts;
  rows = [];
  datePipe = new DatePipe("en-US");
  rangeDates: Date[];
  constructor(
    private productService: ProductService,
    private _toasterService: ToastrService,
    private cd: ChangeDetectorRef
  ) {
  }
  editing = {};
  cols: any[] = []
  totalRecords = 0
  searchText: string;
  maxDate: Date;
  minDate: Date;
  ngOnInit() {
    this.maxDate = new Date();
    var newDt = new Date()
    newDt.setMonth(newDt.getMonth() - 24)
    this.minDate = newDt

    this.cols = [
      { field: 'patient_id', header: 'Patient Id', width: '200px', filterMatchMode: 'contains' },
      { field: 'pid_patient_name', header: 'Name', width: '220px', filterMatchMode: 'contains' },
      { field: 'evn_recorded_date_time', header: 'Event Date', width: '170px', filterMatchMode: 'contains' },
      { field: 'event_desc', header: 'Event Type', width: '280px', filterMatchMode: 'contains' },
      { field: 'msh_system_location', header: 'ED Facility', width: '150px', filterMatchMode: 'contains' },
      { field: 'pd1_provider_name', header: 'Provider Name', width: '180px', filterMatchMode: 'contains' },
      { field: 'note', header: 'Note', width: '350px', filterMatchMode: 'contains' }
    ];
    this.totalRecords = 1000;
    this.loading = true;
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7)
    this.rangeDates = [weekAgo, new Date()]
    this.searhPatient()
  }

  filterData() {
    if (this.searchText.length > 0) {
      var sTxt = this.searchText.trim().toLowerCase()
      this.files = this.cloneData.filter(item => item.data.patient_id.toString().toLowerCase().includes(sTxt) ||
        (item.data.pid_patient_name ? item.data.pid_patient_name.toString().toLowerCase().includes(sTxt) : false) ||
        (item.data.pcp_pd_npi ? item.data.pcp_pd_npi.toString().toLowerCase().includes(sTxt) : false) ||
        (item.data.note ? item.data.note.toString().toLowerCase().includes(sTxt) : false) ||
        (item.data.event_desc ? item.data.event_desc.toString().toLowerCase().includes(sTxt) : false) ||
        (item.data.msh_system_location ? item.data.msh_system_location.toString().toLowerCase().includes(sTxt) : false) ||
        (item.data.pd1_provider_name ? item.data.pd1_provider_name.toString().toLowerCase().includes(sTxt) : false))
    } else
      this.files = [...this.cloneData]
  }



  onNodeExpand(event) {
    this.loading = true;
    var fromDate = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var toDate = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')

    this.productService.childPatientList(event.node.data.id, event.node.data.patient_id, fromDate, toDate).subscribe((item: any) => {
      const node = event.node;
      node.children = []
      var tempArry = []
      item.data.forEach(dt => {
        let node1 = {
          data: {
            id: dt.id,
            patient_id: dt.patient_id,
            pid_patient_name: dt.pid_patient_name,
            primary_insurance_id: dt.primary_insurance_id,
            pcp_pd_npi: dt.pcp_pd_npi,
            pd1_provider_name: dt.pd1_provider_name,
            evn_recorded_date_time: this.datePipe.transform(dt.evn_recorded_date_time, 'yyyy-MM-dd HH:mm:ss'),
            event_desc: dt.event_desc,
            msh_system_location: dt.msh_from_system + " "+ dt.msh_from_location,
            note: dt.note
          }
        }
        tempArry.push(node1)
      });
      node.children = tempArry
      this.files = [...this.files];
      this.cloneData.map(item => {
        if (item.data.id == event.node.data.id)
          item.children = JSON.parse(JSON.stringify(tempArry))
      })
      this.loading = false;
    });
  }

  searhPatient() {
    this.loading = true;
    this.files = []
    this.cloneData = []
    var fromDate = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    var toDate = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    this.productService.uniquePatientList(fromDate, toDate).subscribe((item: any) => {
      item.data.forEach(dt => {
        let node = {
          data: {
            id: dt.id,
            patient_id: dt.patient_id,
            pid_patient_name: dt.pid_patient_name,
            primary_insurance_id: dt.primary_insurance_id,
            pcp_pd_npi: dt.pcp_pd_npi,
            pd1_provider_name: dt.pd1_provider_name,
            evn_recorded_date_time: this.datePipe.transform(dt.evn_recorded_date_time, 'yyyy-MM-dd HH:mm:ss'),
            event_desc: dt.event_desc,
            msh_system_location: dt.msh_from_system + " "+dt.msh_from_location,
            note: dt.note
          },
          leaf: false
        };

        this.files.push(node);
        this.cloneData.push(node);
      });
      this.files = [...this.files]
      this.cloneData = [...this.cloneData]
      this.loading = false;
    })
  }

  onEditComplete(event) {
    var id = event.data.id
    this.productService.updateNote(id, event.data.note)
      .subscribe((res: any) => {
        this._toasterService.success(res.message, 'Patient Information', { timeOut: AppSettings.TOAST_FREEZ_TIME, closeButton: AppSettings.TOAST_CLOSE_BUTTON_TRUE, progressBar: AppSettings.TOAST_PROGRESSBAR_TRUE });
      });
  }

}
