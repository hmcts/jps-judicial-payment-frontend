import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VenueModel } from '../../_models/venue.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService
  ) { }

  public getAllVenues(searchTerm: string): Observable<VenueModel[]> {
    
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post<VenueModel[]>('/refdata/locationss', {searchTerm: searchTerm}, { headers: headers});

  }

}
