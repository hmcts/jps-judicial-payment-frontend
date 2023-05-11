import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpService: HttpClient,
    private cookieService: CookieService
    ) { }

  public loginRedirect() {
    const href = '/auth/login';
    this.setWindowLocationHref(href);
  }

  public isAuthenticated(): Observable<boolean> {
    //Check if Cookie exists to verify if user is authenticated or not
    /*if (this.cookieService.get('__role__'))
    {
      console.log('cookie exists');
      return of(true);
    }

    console.log('Cookie doesnot exist');*/
    return this.httpService.get<boolean>('/auth/isAuthenticated');
  }

  public setWindowLocationHref(href: string) {
    window.location.href = href;
  }

  public getLoggedInUserRole(): string {
    return this.cookieService.get('__role__');
  }
}
