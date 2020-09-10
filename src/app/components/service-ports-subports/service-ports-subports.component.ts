import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PrePortfolio} from '../../_models/pre-portfolio';
import {Portfolio} from '../../_models/portfolio';
import {PreSubPortfolio} from '../../_models/pre-sub';
import {SubPortfolio} from '../../_models/subPortfolio';
import {PreService} from '../../_models/pre-service';
import {Service} from '../../_models/service';
import {PssServiceService} from '../../_services/pss-service.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-service-ports-subports',
  templateUrl: './service-ports-subports.component.html',
  styleUrls: ['./service-ports-subports.component.css']
})
export class ServicePortsSubportsComponent implements OnInit{

  portfolios: Portfolio[];
  activeServices: Service[] = [];
  subportfolios: { [portfolioName: string]: SubPortfolio[] } = {};
  services: { [subPortfolioName: string]: Service []} = {};
  user: any;

  constructor(private pssService: PssServiceService) {
  }

  ngOnInit() {
    this.initPortfolios();
  }

  togglePortfolio(port: Portfolio): void {
    if (!port.active) {
      this.pssService.getSubPortfolios(port.name).subscribe((subports) => {
          this.subportfolios[port.name] = this.toSubs(subports[Object.keys(subports)[0]]);
        });
    }
    else {
      for (const sub of this.subportfolios[port.name]) {
        sub.active = false;
      }
    }
    port.active = !port.active;
  }

  toggleSubPortfolio(subport: SubPortfolio): void {
    if (!subport.active) {
      this.pssService.getServices(subport.name).subscribe((services) => {
          this.services[subport.name] = this.toServices(services[Object.keys(services)[0]]);
        });
    }

    subport.active = !subport.active;
  }

  toggleService(service: Service): void {
    if (!service.active) {
      this.activeServices.push(service);
    }
    service.active = true;
    service.current = true;
    for (const serv of this.activeServices) {
      if (serv.active === true && serv !== service) {
        serv.current = false;
      }
    }
  }

  removeService(service: Service): void {
    let ind = 0;
    for (const serv of this.activeServices) {
      if (serv === service) {
        this.activeServices.splice(ind, 1);
        break;
      }
      ind += 1;
    }
  }


  initPortfolios(): void {
    this.pssService.getPortfolios().subscribe(ports => {
      // console.log(ports);
      this.portfolios = this.toPortfolios(ports[Object.keys(ports)[0]]);
  });
  }

  barSubportfolioName(subPortfolio: SubPortfolio): string {
    if (subPortfolio.name.length > 22) {
      return subPortfolio.name.slice(0, 19) + '...';
    }
    else {
      return subPortfolio.name;
    }
  }

  tabServiceName(service: Service): string {
    if (service.service_name.length > 14) {
      return service.service_name.slice(0, 11) + '...';
    }
    else {
      return service.service_name;
    }
  }

  barServiceName(service: Service): string {
    if (service.service_name.length > 24) {
      return service.service_name.slice(0, 21) + '...';
    }
    else {
      return service.service_name;
    }
  }

  details_class(): any {
    const h3 = document.querySelector('h3');
    // tslint:disable-next-line:max-line-length
    document.querySelector('h3').style.cssText = 'top: ' + (200 + ((this.activeServices.length - this.activeServices.length % 13) * 50) / 13).toString() + 'px;';
    return h3;
  }
  changeOpacity(id: string, state: number): void {
    const icon = document.getElementById(id);
    if (state === 0) {
      icon.style.filter = 'brightness(90%)';
    }
    else {
      icon.style.filter = 'brightness(75%)';
    }
  }

  toPortfolios(p_pr_ports: PrePortfolio[]): Portfolio [] {
      const ports: Portfolio [] = [];
      let port: Portfolio;
      for (const prePort of p_pr_ports) {
        console.log(prePort.id);
        port = prePort;
        /*
        for (const key of Object.keys(prePort)) {
          port[key] = prePort[key];

        }
         */
        port.active = false;
        ports.push(port);
      }
      return ports;
  }

  toSubs(p_pr_subs: PreSubPortfolio[]): SubPortfolio [] {
      const subs: SubPortfolio [] = [];
      let sub: SubPortfolio;
      for (const preSub of p_pr_subs) {
        sub = preSub;
        sub.active = false;
        subs.push(sub);
      }
      return subs;
  }
  toServices(p_pr_servs: PreService[]): Service [] {
      const servs: Service [] = [];
      let serv: Service;
      console.log(Object.keys(Portfolio));
      for (const preServ of p_pr_servs) {
        serv = preServ;
        serv.active = false;
        serv.current = false;
        servs.push(serv);
      }
      return servs;
    }

}
