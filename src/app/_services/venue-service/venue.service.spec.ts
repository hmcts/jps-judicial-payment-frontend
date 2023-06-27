import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VenueService } from './venue.service';
import { VenueModel } from '../../_models/venue.model';
import { CookieService } from 'ngx-cookie-service';

describe('VenueService', () => {
  let venueService: VenueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VenueService
      ]
    });

    venueService = TestBed.inject(VenueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request with the correct headers and body', () => {
    const mockSearchTerm = 'search term';
    const mockResponse: VenueModel[] = [];

    venueService.getAllVenues(mockSearchTerm).subscribe(venues => {
      expect(venues).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/refdata/location');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ searchTerm: mockSearchTerm });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });
});
