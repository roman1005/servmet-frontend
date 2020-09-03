import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicePortsSubportsComponent} from './components/service-ports-subports/service-ports-subports.component';
import {LoginComponent} from './components/login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'services-navigation', component: ServicePortsSubportsComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
