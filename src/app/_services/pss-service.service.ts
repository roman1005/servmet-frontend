import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PrePortfolio} from '../_models/pre-portfolio';
import {Portfolio} from '../_models/portfolio';
import {PreSubPortfolio} from '../_models/pre-sub';
import {SubPortfolio} from '../_models/subPortfolio';
import {PreService} from '../_models/pre-service';
import {Service} from '../_models/service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../_models';
import {AuthenticationService} from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PssServiceService {
  currentUser: User;
  portfolios: PrePortfolio[];

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  getPortfolios(): Observable<Object>{
      const params = new HttpParams().append('token', this.currentUser.token);
      // return this.http.get<SubPortfolio []>('http://127.0.0.1:8000/api/services/' + portfolioName, {params});
      return this.http.get('http://127.0.0.1:8000/api/portfolios/', {params});
  }

  getSubPortfolios(portfolioName: string): Observable<SubPortfolio []>{
      const params = new HttpParams().append('token', this.currentUser.token);
      // return this.http.get<SubPortfolio []>('http://127.0.0.1:8000/api/services/' + portfolioName, {params});
      return this.http.get<SubPortfolio []>('http://127.0.0.1:8000/api/subportfolios/' + portfolioName, {params});
  }

  getServices(subPortfolioName: string): Observable<Service []>{
      const params = new HttpParams().append('token', this.currentUser.token);
      // return this.http.get<SubPortfolio []>('http://127.0.0.1:8000/api/services/' + portfolioName, {params});
      return this.http.get<Service []>('http://127.0.0.1:8000/api/services/' + subPortfolioName, {params});
  }
}
