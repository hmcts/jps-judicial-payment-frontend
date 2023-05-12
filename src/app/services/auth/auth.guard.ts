import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { WindowLocationService } from '../window-location/window-location.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
 
  constructor( 
    private authService: AuthService, 
    private readonly sessionStorage: SessionStorageService,
    private readonly windowLocationService: WindowLocationService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map(isAuth => {
      if (!isAuth) {
        this.authService.loginRedirect();
        return false;
      }

      return true;
    }));
  }

}
