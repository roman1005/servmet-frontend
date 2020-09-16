import { Component, ViewEncapsulation } from '@angular/core';
import {ActiveServicesService} from '../../_services/activeServices.service';
import {Service} from '../../_models/service';


@Component({
  selector: 'app-scroll-tabs',
  templateUrl: './scroll-tabs.component.html',
  styleUrls: ['./scroll-tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScrollTabsComponent {

  constructor(public actServ: ActiveServicesService) { }

  toggleService(service: Service): void {
    if (!service.active) {
      this.actServ.activeServices.push(service);
    }
    service.active = true;
    service.current = true;
    for (const serv of this.actServ.activeServices) {
      if (serv.active === true && serv.id !== service.id) {
        serv.current = false;
      }
    }
  }

  removeService(service: Service): void {
    let ind = 0;
    service.current = false;
    for (const serv of this.actServ.activeServices) {
      if (serv === service) {
        this.actServ.activeServices.splice(ind, 1);
        if (ind >= this.actServ.activeServices.length - 5)
        {
          const elem = document.getElementsByClassName('mat-tab-header-pagination')[0] as HTMLElement;
          elem.click();
        }
        break;
      }
      ind += 1;
    }
    service.active = false;

  }

  tabName(name: string): string {
    if (name.length > 16) {
      return name.slice(0, 16) + '...  ';
    }
    else {
      return name;
    }
  }

}
