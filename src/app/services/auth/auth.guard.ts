import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
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
    private readonly windowLocationService: WindowLocationService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map(isAuth => {
      if (!isAuth) {
        this.storeRedirectUrl();
        this.authService.loginRedirect();
        return false;
      }
  
      this.redirectToStoredUrl();
      return true;
    }));
  }

  private storeRedirectUrl(): void {
    this.sessionStorage.setItem('redirectUrl', this.windowLocationService.getPathName());
  }

  private redirectToStoredUrl(): void {
    const currentLocationPathName = this.windowLocationService.getPathName();
    const currentPathIsNotEmpty = /^\/([a-z]+)/g;
    const currentPathIsRoot = !currentLocationPathName.match(currentPathIsNotEmpty);

    if (currentPathIsRoot) {
      const storedRedirectUrl = this.sessionStorage.getItem('redirectUrl', true);

      if (!storedRedirectUrl) { return; }

      this.authService.setWindowLocationHref(storedRedirectUrl);
    }
  }
}
