import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PrePortfolio} from '../../_models/pre-portfolio';
import {Portfolio} from '../../_models/portfolio';
import {PreSubPortfolio} from '../../_models/pre-sub';
import {SubPortfolio} from '../../_models/subPortfolio';
import {PreService} from '../../_models/pre-service';
import {Service} from '../../_models/service';
import {PssServiceService} from '../../_services/pss-service.service';
import {ActiveServicesService} from '../../_services/activeServices.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-service-ports-subports',
  templateUrl: './service-ports-subports.component.html',
  styleUrls: ['./service-ports-subports.component.css']
})
export class ServicePortsSubportsComponent implements OnInit{

  portfolios: Portfolio[];
  subportfolios: { [portfolioName: string]: SubPortfolio[] } = {};
  services: { [subPortfolioName: string]: Service []} = {};
  user: any;

  constructor(private pssService: PssServiceService, public actServ: ActiveServicesService) {
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

  toggleSubPortfolio(subport: SubPortfolio, portfolio: Portfolio): void {
    if (!subport.active) {
      this.pssService.getServices(subport.name).subscribe((services) => {
          this.services[subport.name] = this.toServices(services[Object.keys(services)[0]], portfolio);
        });
    }

    subport.active = !subport.active;
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
  /*
  details_class(): any {
    const h3 = document.querySelector('h3');
    // tslint:disable-next-line:max-line-length
    document.querySelector('h3').style.cssText = 'top: ' + (200 + ((this.activeServices.length - this.activeServices.length % 13) * 50) / 13).toString() + 'px;';
    return h3;
  }
  */

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
  toServices(p_pr_servs: PreService[], portfolio: Portfolio): Service [] {
      const servs: Service [] = [];
      let serv: Service;
      for (const preServ of p_pr_servs) {
        serv = preServ;
        serv.active = false;
        serv.current = false;
        serv.red = portfolio.portfolioRed;
        serv.blue = portfolio.portfolioBlue;
        serv.green = portfolio.portfolioGreen;
        servs.push(serv);
      }
      return servs;
    }

}
