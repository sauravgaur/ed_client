import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardV3Component } from './dashboard-v3/dashboard-v3.component';
import { DashboardV4Component } from './dashboard-v4/dashboard-v4.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
// import { TooltipModule } from "ngx-tooltip";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TooltipModule.forRoot(),
    TreeTableModule
  ],
  declarations: [DashboadDefaultComponent, DashboardV2Component, DashboardV3Component, DashboardV4Component]
})
export class DashboardModule { }