import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../_services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
 
  constructor( 
    private authService: AuthService, 
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
