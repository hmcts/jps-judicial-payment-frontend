import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsManageGuard implements CanActivate {
  constructor( 
    private router: Router,
    private cookies: CookieService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.cookies.get('__userrole__');
    
    if(userRole.indexOf('jps-recorder') != -1){
      return true;
    }
    else {
      void this.router.navigate(['sittingRecords', 'home'])
      return false;
    }
  
  }
  
}
