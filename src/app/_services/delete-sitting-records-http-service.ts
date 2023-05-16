import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteSittingRecordHttp {

  private deleteRecordsURL = '/sittingrecords';

  constructor(private http: HttpClient) { }

  deleteRecord(recordID: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const deleteUrlWithId = `${this.deleteRecordsURL}/${recordID}` 

    return this.http.delete<string>(deleteUrlWithId, httpOptions).pipe(
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
