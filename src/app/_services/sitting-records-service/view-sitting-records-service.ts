import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ViewSittingRecordPost, ViewSittingRecordResponse } from '../../_models/viewSittingRecords.model'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ViewSittingRecordService {

  constructor(
    private http: HttpClient,
    private readonly cookies: CookieService
  ) { }

  postObject(data: ViewSittingRecordPost): Observable<ViewSittingRecordResponse> {
    
    const S2SToken: string  = this.cookies.get('__serviceauth__');
    const authToken: string = this.cookies.get('__auth__')

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
        'ServiceAuthorization': S2SToken
      },
      params: {'hmctsServiceCode': 'BBA3'}
    };

    return this.http.post<ViewSittingRecordResponse>('/sittingRecords/searchSittingRecords', data, httpOptions);
  }
}