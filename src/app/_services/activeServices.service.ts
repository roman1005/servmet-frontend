import { Injectable } from '@angular/core';
import { Service } from './../_models/service';

@Injectable({ providedIn: 'root' })
export class ActiveServicesService {

    activeServices: Service [] = [];
    constructor() {
    }

    toggleService(service: Service, index): void {
    if (!service.active && this.activeServices.filter(serv => (serv.id === service.id)).length === 0) {
      this.activeServices.push(service);
    }
    service.active = true;
    service.current = true;
    for (const serv of this.activeServices) {
      if (serv.active === true && serv.id !== service.id) {
        serv.current = false;
      }
    }
  }

  removeService(service: Service): void {
    let ind = 0;
    service.active = false;
    service.current = false;
    for (const serv of this.activeServices) {
      if (serv === service) {
        this.activeServices.splice(ind, 1);
        break;
      }
      ind += 1;
    }
  }
}
