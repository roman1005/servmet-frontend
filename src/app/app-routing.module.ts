import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicePortsSubportsComponent} from './components/service-ports-subports/service-ports-subports.component';
import {LoginComponent} from './components/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './_helpers';


const routes: Routes = [
  {path: 'services-navigation', component: ServicePortsSubportsComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
