import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EChartOption } from 'echarts';
import { echartStyles } from '../../../shared/echart-styles';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'app-dashboad-default',
    templateUrl: './dashboad-default.component.html',
    styleUrls: ['./dashboad-default.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboadDefaultComponent implements OnInit {
    chartLineOption1: EChartOption;
    chartLineOption2: EChartOption;
    chartLineOption3: EChartOption;
    salesChartBar: EChartOption;

    weeklyChartBar: EChartOption;
    monthlyChartBar: EChartOption;
    dailyChartBar: EChartOption;

    salesChartPie: EChartOption;
    insuranceChartPie: EChartOption;
    searchControl: FormControl = new FormControl();
    products: any[] = [];
    filteredProducts: any[] = [];
    datePipe = new DatePipe("en-US");
    showLoading: boolean = true;
    constructor(private productService: ProductService) { }
    columns = [
        { name: 'Name' },
        { name: 'Facility' },
        { name: 'Insurance' },
        { name: 'Name' },
        { name: 'Facility' },
        { name: 'Insurance' }
    ];
    weeklyCount: number = 0;
    monthlyCount: number = 0;
    pastMonthCount: number = 0;
    avgCount: number = 0;
    yearlyWeeklyAvg: number = 0;
    rangeDates: Date[];
    cols: any[] = []
    lastNote: any;
    last7DaysFeedCnt: any;
    treeCols: any[] = []

    loading: boolean = false;
  files: TreeNode[] = [];
  cloneData: any[] = []
    ngOnInit() {
        this.getMonthlyChartBar()
        this.getWeeklyChartBar()
        this.getDailyChartBar()
        this.getFacilityWiseReport()
        this.getInsuranceCompanyWiseReport()
        let weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7)
        this.rangeDates = [weekAgo, new Date()]
        this.cols = [
            { field: 'filename', header: 'File Name', width: '300px', filterMatchMode: 'contains'},
            { field: 'pid_patient_name', header: 'Patient Name', width: '200px', filterMatchMode: 'contains' },
            { field: 'patient_id', header: 'Patient Id', width: '150px', filterMatchMode: 'contains' },
            { field: 'visitDate', header: 'Event Date', width: '170px', filterMatchMode: 'contains' },
            { field: 'event_desc', header: 'Event Type', width: '250px', filterMatchMode: 'contains' },
            { field: 'pcp_pd_npi', header: 'NPI', width: '150px', filterMatchMode: 'contains' },
            { field: 'msh_from_system', header: 'ED Facility', width: '150px', filterMatchMode: 'contains' },
            // { field: 'primary_insurance_id', header: '#Insurance', width: '135px' },
            // { field: 'primary_insurance_company', header: 'Ins. Comp.', width: '135px', filterMatchMode: 'contains' },
            { field: 'pd1_provider_name', header: 'Provider', width: '200px', filterMatchMode: 'contains' },
            // { field: 'note', header: 'Note', width: '300px' },
        ];
        this.productService.dashboardCount()
            .subscribe((res: any) => {
                if (res.status == 'success') {
                    this.weeklyCount = res.data.weeklyCount
                    this.monthlyCount = res.data.monthlyCount
                    this.yearlyWeeklyAvg = res.data.yearlyWeeklyAvg
                }
            })

        this.productService.past3MonthReVisitCount().subscribe((res: any) => {
            if (res.status == 'success') {
                this.pastMonthCount = res.data.pastMonthCount
            }
        })

        this.productService.lastNoteUpdated().subscribe((res: any) => {
            if (res.status == 'success') {
                console.log("res.data in last note:", res.data)
                this.lastNote = res.data

            }
        })

        this.productService.last7DaysFeeds().subscribe((res: any) => {
            if (res.status == 'success') {
                console.log("res.data in last note:", res.data)
                this.last7DaysFeedCnt = res.data.feedCnt
            }
        })
        
        this.treeCols = [
            { field: 'patient_id', header: 'Patient Id', width: '200px',  filterMatchMode: 'contains' },
            { field: 'pid_patient_name', header: 'Name', width: '220px',  filterMatchMode: 'contains' },
            { field: 'evn_recorded_date_time', header: 'Event Date', width: '170px',  filterMatchMode: 'contains' },
            { field: 'event_desc', header: 'Event Type', width: '280px',  filterMatchMode: 'contains' },
            { field: 'msh_location_system', header: 'ED Facility', width: '150px',  filterMatchMode: 'contains' },
            { field: 'pd1_provider_name', header: 'Provider Name', width: '180px',  filterMatchMode: 'contains' },
            // { field: 'note', header: 'Note', width: '350px',  filterMatchMode: 'contains' }
          ];

    this.searhPatient()

    //     var date1 = this.datePipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
    //     var date2 = this.datePipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
    //     this.productService.getDateRangeFeedList(date2, date2)
    //         .subscribe((res: any) => {
    //             this.products = [...res.data];
    //             this.products.map(item => {
    //                 item.visitDate = this.datePipe.transform(item.evn_recorded_date_time, 'yyyy-MM-dd HH:mm:ss')
    //             })
    //             this.filteredProducts = this.products;
    //             this.showLoading = false;
    //         });
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
                msh_location_system: dt.msh_from_location + " "+ dt.msh_from_system,
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
        this.productService.uniquePatientList(toDate, toDate).subscribe((item: any) => {
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
                msh_location_system: dt.msh_from_location + " "+dt.msh_from_system,
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

    getFacilityWiseReport() {
        this.productService.facilityWiseReport()
            .subscribe((res: any) => {
                this.salesChartPie = this.createPieChart(res.data)
            })
    }
    getInsuranceCompanyWiseReport() {
        this.productService.insuranceCompanyWiseReport()
            .subscribe((res: any) => {
                this.insuranceChartPie = this.createPieChart(res.data)
            })
    }


    getMonthlyChartBar() {
        this.productService.getMonthlyChartBar()
            .subscribe((res: any) => {
                // var dt = res.data
                var headers = res.data.map(function (value) {
                    return value.monthName;
                });
                var values = res.data.map(function (value) {
                    return value.monthlyCnt;
                });
                this.monthlyChartBar = this.createBarChart(headers, values)
            })
    }

    getWeeklyChartBar() {
        this.productService.getWeeklyChartBar()
            .subscribe((res: any) => {
                // var dt = res.data
                var headers = res.data.map(function (value) {
                    return value.weekDate;
                });
                var values = res.data.map(function (value) {
                    return value.weeklyCnt;
                });
                // console.log("weekly header:", headers)
                // console.log("weekly values:", values)
                this.weeklyChartBar = this.createBarChart(headers, values)
            })
    }

    getDailyChartBar() {
        this.productService.getDailyChartBar()
            .subscribe((res: any) => {
                // var dt = res.data
                if (res.data.length > 0) {
                    var headers = res.data.map(function (value) {
                        return value.dayDate;
                    });
                    var values = res.data.map(function (value) {
                        return value.dailyCnt;
                    });
                    this.dailyChartBar = this.createBarChart(headers, values)
                }
            })
    }

    createBarChart(headers, values) {
        return {
            legend: {
                borderRadius: 0,
                orient: 'horizontal',
                x: 'right',
                // data: ['Patient Count']
            },
            grid: {
                left: '8px',
                right: '8px',
                bottom: '0',
                containLabel: true
            },
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },
            xAxis: [{
                type: 'category',
                data: headers,
                axisTick: {
                    alignWithLabel: true
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                min: 0,
                // max: 100000,
                // interval: 25000,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    interval: 'auto'
                }
            }

            ],

            series: [{
                // name: 'Online',
                data: values,
                label: { show: false, color: '#0168c1' },
                type: 'bar',
                barGap: 0,
                color: '#bcbbdd',
                smooth: true,

            }
            ]
        };
    }

    createPieChart(data) {
        return {
            // color: ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)'
            },

            xAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }

            ],
            yAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
            ],
            series: [{
                name: 'No. of patient visited',
                type: 'pie',
                radius: '75%',
                center: ['50%', '50%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
            ]
        };
    }
}
