import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VenueModel } from '../_models/venue.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private readonly http: HttpClient) { }

  public getAllVenues(searchTerm: string): Observable<VenueModel[]> {
    //return this.http.get<VenueModel[]>(`http://rd-location-ref-api-aat.service.core-compute-aat.internal/refdata/location/court-venues/venue-search?search-string=${searchTerm}`);
    return this.http.get<VenueModel[]>('http://localhost:3000/venues');
  }

}