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
    
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post<VenueModel[]>('/refdata/location', {searchTerm: searchTerm}, { headers: headers});

  }

  public getAllRegions(): Observable<RegionModel[]> {

    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post<RegionModel[]>('/refdata/location/regions', null, { headers: headers});

  }

}