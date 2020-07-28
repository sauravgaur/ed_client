import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CardsEcommerceComponent } from './cards-ecommerce/cards-ecommerce.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { ModalsComponent } from './modals/modals.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CardMetricsComponent } from './card-metrics/card-metrics.component';
import { BadgesComponent } from './badges/badges.component';
import { CardWidgetsComponent } from './card-widgets/card-widgets.component';
import { LoadersComponent } from './loaders/loaders.component';
import { ButtonsLoadingComponent } from './buttons-loading/buttons-loading.component';
import { PopoverComponent } from './popover/popover.component';
import { RatingComponent } from './rating/rating.component';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { TreeTableComponent } from './tree-table/tree-table.component';
import { DischargeComponent } from './report-tracking/discharge.component';
import { NewadmissionsComponent } from './report-tracking/newadmissions.component';
import { DbSwitchComponent } from './db-switch/db-switch.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { ReportTrackingComponent } from './report-tracking/report-tracking.component';
import { EmailTrackingComponent } from './report-tracking/email-tracking.component';
import { EmailQueueComponent } from './report-tracking/email-queue.component';
import { ReportPublicDomainComponent } from './report-tracking/report-public-domain.component';
import { LookupFailedComponent } from './report-tracking/lookup-failed.component';
import { MultiplelookupComponent } from './report-tracking/multiplelookup.component';

const routes: Routes = [
  {
    path: 'alerts',
    component: AlertsComponent
  },
  {
    path: 'filter-table',
    component: FilterTableComponent
  },
  {
    path: 'tree-table',
    component: TreeTableComponent
  },
  {
    path: 'discharge',
    component: DischargeComponent
  },
  {
    path: 'newadmissions',
    component: NewadmissionsComponent
  },
  {
    path: 'multiplelookup',
    component: MultiplelookupComponent
  },
  {
    path: 'db-switch',
    component: DbSwitchComponent
  },
  {
    path: 'audit-log',
    component: AuditLogComponent
  },
  {
    path: 'report-tracking',
    component: ReportTrackingComponent
  },
  {
    path: 'email-tracking',
    component: EmailTrackingComponent
  },
  {
    path: 'email-queue',
    component: EmailQueueComponent
  },
  {
    path: 'lookup-failed',
    component: LookupFailedComponent
  },
  {
    path: 'report-public-domain',
    component: ReportPublicDomainComponent
  },
  {
    path: 'accordions',
    component: AccordionsComponent
  },
  {
    path: 'badges',
    component: BadgesComponent
  },
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'buttons-loading',
    component: ButtonsLoadingComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },
  {
    path: 'cards-widget',
    component: CardWidgetsComponent
  },
  {
    path: 'cards-ecommerce',
    component: CardsEcommerceComponent
  },
  {
    path: 'cards-metrics',
    component: CardMetricsComponent
  },
  {
    path: 'modals',
    component: ModalsComponent
  },
  {
    path: 'loaders',
    component: LoadersComponent
  },
  {
    path: 'popover',
    component: PopoverComponent
  },
  {
    path: 'rating',
    component: RatingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiKitsRoutingModule { }
