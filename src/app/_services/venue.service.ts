import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VenueModel } from '../_models/venue.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { S2S } from '@hmcts/rpx-xui-node-lib';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService
  ) { }

  public getAllVenues(searchTerm: string): Observable<VenueModel[]> {
    const S2SToken: string  = 'M2GT4N2JJA6YEUA5';
    const httpOptions = {
      headers: new HttpHeaders({
        'ServiceAuthorization': S2SToken,
        'Authorization': this.cookies.get('__auth__')
      })
    };
    
    return this.http.get<VenueModel[]>(`http://rd-location-ref-api-aat.service.core-compute-aat.internal/refdata/location/court-venues/venue-search?search-string=${searchTerm}`, httpOptions);
    //return this.http.get<VenueModel[]>('http://localhost:2000/venues');
  }

}