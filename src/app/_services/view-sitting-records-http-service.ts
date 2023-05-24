import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ViewSittingRecordPost } from '../_models/view-sitting-records-post'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ViewSittingRecordHttp {

  private viewRecordsURL = '/sittingRecords/searchSittingRecords';

  constructor(
    private http: HttpClient,
    private readonly cookies: CookieService
  ) { }

  postObject(data: ViewSittingRecordPost): Observable<any> {
    
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

    return this.http.post<ViewSittingRecordPost>(this.viewRecordsURL, data, httpOptions).pipe(
      map(
        (response) => {
          if(response){
            return response
          }else{
            return []
          }
        }
      )
    );
  }
}
