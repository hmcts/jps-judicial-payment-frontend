import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsLandingGuard implements CanActivate {

  constructor( 
    private cookies: CookieService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.cookies.get('__userrole__');
    if(userRole.indexOf('jps-recorder') != -1){
      return false;
    }
    else {
      return true;
    }
  
  }
  
}
