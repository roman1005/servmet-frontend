import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';
import { AuthenticationService } from '../_services';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.currentUserValue;
        const user = jwt_decode(currentUser.token);
        const expTo = user.exp * 1000;
        const dateNow = Date.now();
        if (dateNow <= expTo) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.authenticationService.setCurrentUserValue(null);
        this.router.navigate(['/login']);
        return false;
    }
}
