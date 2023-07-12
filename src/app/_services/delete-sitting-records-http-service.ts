import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteSittingRecordHttp {

  private deleteRecordsURL = '';

  constructor(private http: HttpClient) { }

  deleteRecord(recordID: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const deleteUrlWithId = `/sittingRecords/${recordID}` 

    return this.http.delete<string>(deleteUrlWithId, httpOptions)
  }
}
