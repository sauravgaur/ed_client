import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ProductService } from '../../../services/product.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin-layout-sidebar-large',
  templateUrl: './admin-layout-sidebar-large.component.html',
  styleUrls: ['./admin-layout-sidebar-large.component.scss'],
  providers: [MessageService]
})
export class AdminLayoutSidebarLargeComponent implements OnInit {

    moduleLoading: boolean;
    @ViewChild(PerfectScrollbarDirective, { static: true }) perfectScrollbar: PerfectScrollbarDirective;
  
    constructor(
      public navService: NavigationService,
      public searchService: SearchService,
      private router: Router,
      private _productService: ProductService,
      private messageService: MessageService
    ) { }
    alertCards: any = {}
    ngOnInit() {
      this._productService.last12HourFeed().subscribe((resp: any) =>{
        if(resp.data && resp.data.length == 0){
          this.messageService.clear()
          this.messageService.add({key: 'tc', sticky: true, severity:'info', summary: 'Info Message', detail:'No Feed has been reported in the last 12hrs'});
          this.alertCards = {
            type: 'info',
            message: 'No Feed has been reported in the last 12hrs',
          }
        }
      })
      
      this.router.events.subscribe(event => {
        if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
          this.moduleLoading = true;
        }
        if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
          this.moduleLoading = false;
        }
      });
    }

}
