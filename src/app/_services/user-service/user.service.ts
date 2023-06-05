import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService
  ) { }

  public getUsers(searchTerm: string, venueEpims: string): Observable<any[]> {

    // TODO: move these to service file
    const S2SToken: string  = this.cookies.get('__serviceauth__');
    const authToken: string = this.cookies.get('__auth__')

    const requestBody = {
        "searchString": searchTerm,
        "serviceCode": "BFA1",
        "location": venueEpims
      }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authToken,
      'ServiceAuthorization': S2SToken
    };

    return this.http.post<any[]>('/refdata/user', {searchObject: requestBody}, { headers: headers });

  }

  public getUserInfo(userCode: string): Observable<any[]> {

    // TODO: move these to service file
    const S2SToken: string  = this.cookies.get('__serviceauth__');
    const authToken: string = this.cookies.get('__auth__')

    const requestBody = {
        "personal_code": [userCode]
      }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authToken,
      'ServiceAuthorization': S2SToken
    };

    return this.http.post<any[]>('/refdata/userInfo', {userCode: requestBody}, { headers: headers });

  }

}