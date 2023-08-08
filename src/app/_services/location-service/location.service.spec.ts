import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { VenueModel } from '../../_models/venue.model';
import { RegionModel } from '../../_models/region.model';

describe('LocationService', () => {
  let locationService: LocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LocationService,
      ]
    });

    locationService = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request with the correct headers and body', () => {
    const mockServiceCode = 'BBA3';
    const mockResponse: VenueModel[] = [];

    locationService.getAllVenues(mockServiceCode).subscribe(venues => {
      expect(venues).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/refdata/location');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ service_code: mockServiceCode });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });

  it('getAllRegions should send a POST request with the correct headers and body', () => {
    const mockResponse: RegionModel[] = [];

    locationService.getAllRegions().subscribe(regions => {
      expect(regions).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/refdata/location/regions');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });
});
