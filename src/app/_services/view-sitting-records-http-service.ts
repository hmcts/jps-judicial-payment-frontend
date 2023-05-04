import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ViewSittingRecordPost } from '../_models/view-sitting-records-post'

@Injectable({
  providedIn: 'root'
})
export class ViewSittingRecordHttp {

  private viewRecordsURL = 'test.com';

  constructor(private http: HttpClient) { }

  postObject(data: ViewSittingRecordPost): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
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
