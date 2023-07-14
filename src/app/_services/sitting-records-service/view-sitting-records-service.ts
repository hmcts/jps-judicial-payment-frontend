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

  postObject(data: ViewSittingRecordPost, serviceCode: string): Observable<ViewSittingRecordResponse> {

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {'hmctsServiceCode': serviceCode}
    };

    return this.http.post<ViewSittingRecordResponse>('/sittingRecords/searchSittingRecords', data, httpOptions);
  }
}