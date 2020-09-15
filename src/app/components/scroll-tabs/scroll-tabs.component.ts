import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Service} from '../../_models/service';
import {ActiveServicesService} from '../../_services/activeServices.service'

@Component({
  selector: 'scroll-tabs',
  templateUrl: './scroll-tabs.component.html',
  styleUrls: ['./scroll-tabs.component.css']
})
export class ScrollTabsComponent {

  constructor(public actServ: ActiveServicesService) { }

  tabServiceName(service: Service): string {
    if (service.service_name.length > 14) {
      return service.service_name.slice(0, 11) + '...';
    }
    else {
      return service.service_name;
    }
  }

}
