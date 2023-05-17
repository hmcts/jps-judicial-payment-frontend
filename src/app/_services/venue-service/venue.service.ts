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
    //const S2SToken: string  = 'M2GT4N2JJA6YEUA5';
    //const authToken: string = this.cookies.get('__auth__')

    const S2SToken: string  = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqcHNfanVkaWNpYWxfcGF5bWVudF9zZXJ2aWNlIiwiZXhwIjoxNjg0MjQyNDA2fQ.if9V3qKCfNBLq8W3sJXmA2RpqZkLi5t2WSTzNHp-cP_M4D6iz-Zb12AhED4dgvqsETKz-P8ORgwsv7Tc2pMLNw';
    const authToken: string = 'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJqcHMtc3lzdGVtQGdtYWlsLmNvbSIsImN0cyI6Ik9BVVRIMl9TVEFURUxFU1NfR1JBTlQiLCJhdXRoX2xldmVsIjowLCJhdWRpdFRyYWNraW5nSWQiOiJkNWIyZDEzMC1kNWFkLTRjMDctOGM3Ny1iMjNhZTRmM2RlOWUtNDM0NDM0NzAyIiwiaXNzIjoiaHR0cHM6Ly9mb3JnZXJvY2stYW0uc2VydmljZS5jb3JlLWNvbXB1dGUtaWRhbS1hYXQyLmludGVybmFsOjg0NDMvb3BlbmFtL29hdXRoMi9yZWFsbXMvcm9vdC9yZWFsbXMvaG1jdHMiLCJ0b2tlbk5hbWUiOiJhY2Nlc3NfdG9rZW4iLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiYXV0aEdyYW50SWQiOiJ6QUtXTVdKcjdIMnhHVUVZaThNdDE3Si12LXMiLCJhdWQiOiJqcHNfanVkaWNpYWxfcGF5bWVudF9zZXJ2aWNlIiwibmJmIjoxNjg0MjI4MDA1LCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwicm9sZXMiXSwiYXV0aF90aW1lIjoxNjg0MjI4MDA1LCJyZWFsbSI6Ii9obWN0cyIsImV4cCI6MTY4NDI1NjgwNSwiaWF0IjoxNjg0MjI4MDA1LCJleHBpcmVzX2luIjoyODgwMCwianRpIjoid0M5cnZLN3JuZDZpOFBiRGpIa2luejB2RlJJIn0.hgaGi0ifAjnNvRADOhxLuldIgu_Nbu0o96S5Y5Mr3u-1WD-Fl8m3lViOtMkk9gAJe_GPMaJjZ78VE6DEQG6Jc6Qo2BuwECF1Hru0_Q2dJFr3hZMHOGE6ecAZI3eqVytQVvSegArlDAMjsh8R_6oZccLjUrankXvfBjq7Wgpl_CjIDOubJTpoZjtrXyj0H6S7OFmJF5zLQc3yM8EyC12YIDHaDtUARIu4RKLFOLL6rs7KxXUrmgKz8S8dG0esyREVgOT6lGl7USsYHeZvggjHi9_Y58sGVhezrFgbr0uNynlkENB35ic9tpQxBFE6M3BudhQRCNpDvRDWSjKg8cFIOQ';
    
    return this.http.post<VenueModel[]>('/test', {S2S: S2SToken, AUTH: authToken, SEARCHSTRING: searchTerm});

  }

}