import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersProfileComponent } from './user-profile/users-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LaddaModule } from 'angular2-ladda';
// import { ToastrModule } from 'ngx-toastr';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    LaddaModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    TableModule
  ],
  declarations: [UserProfileComponent, UsersProfileComponent]
})
export class PagesModule { }
