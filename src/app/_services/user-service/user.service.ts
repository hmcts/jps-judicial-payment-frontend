import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserModel, UserInfoModel } from '../../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService
  ) { }

  public getUsers(searchTerm: string, serviceCode: string, venueEpims: string): Observable<UserModel[]> {

    const requestBody = {
        "searchString": searchTerm,
    }

    if(serviceCode){
      requestBody['serviceCode'] = serviceCode
    }
    if(venueEpims){
      requestBody['location'] = venueEpims
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post<UserModel[]>('/refdata/user', {searchObject: requestBody}, { headers: headers });

  }

  public getUserInfo(userCode: string): Observable<UserInfoModel[]> {

    const requestBody = {
        "personal_code": [userCode]
      }

    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post<UserInfoModel[]>('/refdata/userInfo', {userCode: requestBody}, { headers: headers });

  }

}