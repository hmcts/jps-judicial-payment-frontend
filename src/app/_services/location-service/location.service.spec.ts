import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { VenueModel } from '../../_models/venue.model';
import { RegionModel } from '../../_models/region.model';
import { CookieService } from 'ngx-cookie-service';

describe('LocationService', () => {
  let locationService: LocationService;
  let httpMock: HttpTestingController;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LocationService,
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    });

    locationService = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAllVenues should send a POST request with the correct headers and body', () => {
    const mockSearchTerm = 'search term';
    const mockResponse: VenueModel[] = [];

    cookieService.get.withArgs('__serviceauth__').and.returnValue('mockS2SToken');
    cookieService.get.withArgs('__auth__').and.returnValue('mockAuthToken');

    locationService.getAllVenues(mockSearchTerm).subscribe(venues => {
      expect(venues).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/refdata/location');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ searchTerm: mockSearchTerm });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('mockAuthToken');
    expect(req.request.headers.get('ServiceAuthorization')).toBe('mockS2SToken');

    req.flush(mockResponse);
  });

  it('getAllRegions should send a POST request with the correct headers and body', () => {
    const mockResponse: RegionModel[] = [];

    cookieService.get.withArgs('__serviceauth__').and.returnValue('mockS2SToken');
    cookieService.get.withArgs('__auth__').and.returnValue('mockAuthToken');

    locationService.getAllRegions().subscribe(regions => {
      expect(regions).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/refdata/location/regions');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('mockAuthToken');
    expect(req.request.headers.get('ServiceAuthorization')).toBe('mockS2SToken');

    req.flush(mockResponse);
  });
});
