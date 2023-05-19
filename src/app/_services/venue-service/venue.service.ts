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

    // TODO: move these to service file
    const S2SToken: string  = this.cookies.get('serviceAuth');
    const authToken: string = this.cookies.get('__auth__')

    return this.http.post<VenueModel[]>('/test', {S2S: S2SToken, AUTH: authToken, SEARCHSTRING: searchTerm});

  }

}