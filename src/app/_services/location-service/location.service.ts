import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VenueModel } from '../../_models/venue.model';
import { RegionModel } from '../../_models/region.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService
  ) { }

  public getAllVenues(searchTerm: string): Observable<VenueModel[]> {

    // TODO: move these to service file
    const S2SToken: string  = this.cookies.get('__serviceauth__');
    const authToken: string = this.cookies.get('__auth__')

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authToken,
      'ServiceAuthorization': S2SToken
    };

    return this.http.post<VenueModel[]>('/refdata/location', {searchTerm: searchTerm}, { headers: headers});

  }

  public getAllRegions(): Observable<RegionModel[]> {

    // TODO: move these to service file
    const S2SToken: string  = this.cookies.get('__serviceauth__');
    const authToken: string = this.cookies.get('__auth__')

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authToken,
      'ServiceAuthorization': S2SToken
    };

    return this.http.post<RegionModel[]>('/refdata/location/regions', null, { headers: headers});

  }

}