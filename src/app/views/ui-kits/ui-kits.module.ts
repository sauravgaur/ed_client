import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { UiKitsRoutingModule } from './ui-kits-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CardsEcommerceComponent } from './cards-ecommerce/cards-ecommerce.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { AccordionsComponent } from './accordions/accordions.component';
import { ModalsComponent } from './modals/modals.component';
import { AlertsComponent } from './alerts/alerts.component';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { TreeTableComponent } from './tree-table/tree-table.component';
import { DbSwitchComponent } from './db-switch/db-switch.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { ReportTrackingComponent } from './report-tracking/report-tracking.component';
import { EmailTrackingComponent } from './report-tracking/email-tracking.component';
import { DischargeComponent } from './report-tracking/discharge.component';
import { NewadmissionsComponent } from './report-tracking/newadmissions.component';
import { ToastrModule } from 'ngx-toastr';
import { CardMetricsComponent } from './card-metrics/card-metrics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { BadgesComponent } from './badges/badges.component';
import { CardWidgetsComponent } from './card-widgets/card-widgets.component';
import { LoadersComponent } from './loaders/loaders.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { ButtonsLoadingComponent } from './buttons-loading/buttons-loading.component';
import { LaddaModule } from 'angular2-ladda';
import { PopoverComponent } from './popover/popover.component';
import { RatingComponent } from './rating/rating.component';
import {CalendarModule} from 'primeng/calendar';
import {TreeTableModule} from 'primeng/treetable';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { EmailQueueComponent } from './report-tracking/email-queue.component';
import { ReportPublicDomainComponent } from './report-tracking/report-public-domain.component';
import { LookupFailedComponent } from './report-tracking/lookup-failed.component';
import { MultiplelookupComponent } from './report-tracking/multiplelookup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgbModule,
    NgxEchartsModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    LaddaModule.forRoot({ style: 'expand-left'}),
    UiKitsRoutingModule,
    CalendarModule,
    TreeTableModule,
    SliderModule,
    DropdownModule,
    TableModule,
    MultiSelectModule,
    OverlayPanelModule
  ],
  declarations: [
      ButtonsComponent, 
      CardsComponent, 
      CardsEcommerceComponent, 
      AccordionsComponent, 
      ModalsComponent, 
      AlertsComponent, 
      FilterTableComponent,
      TreeTableComponent,
      DischargeComponent,
      NewadmissionsComponent,
      MultiplelookupComponent,
      DbSwitchComponent,
      AuditLogComponent,
      ReportTrackingComponent,
      ReportPublicDomainComponent,
      EmailTrackingComponent,
      EmailQueueComponent,
      CardMetricsComponent, 
      BadgesComponent, 
      CardWidgetsComponent, 
      LoadersComponent, 
      ButtonsLoadingComponent, 
      PopoverComponent, 
      RatingComponent,
      LookupFailedComponent
    ]
})
export class UiKitsModule { }
