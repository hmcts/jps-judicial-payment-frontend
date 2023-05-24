import { TestBed } from '@angular/core/testing';
import { VenueService } from './venue.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('VenueService', () => {
  let service: VenueService;
  let http: HttpClient;
  let cookie: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenueService);
    http = TestBed.inject(HttpClient);
    cookie = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllVenues', () => {
    it('should return venues', () => {
      const searchTerm = 'aaa';
      const S2SToken = 'abcdefgh'
      const authToken = '12345678'
      cookie.set('__serviceauth__', 'abcdefgh');
      cookie.set('__auth__', '12345678');

      const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': authToken, 
        'ServiceAuthorization': S2SToken 
      };
      
      service.getAllVenues(searchTerm);

      expect(http.post).toHaveBeenCalledWith('/refdata/location', { searchTerm: searchTerm }, { headers: headers });
    })
  })
});
