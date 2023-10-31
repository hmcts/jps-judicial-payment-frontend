import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteSittingRecordHttp {


  constructor(private http: HttpClient) { }

  deleteRecord(recordID: number): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const deleteUrlWithId = `/sittingrecord/${recordID}` 

    return this.http.delete<string>(deleteUrlWithId, httpOptions)
  }
}
