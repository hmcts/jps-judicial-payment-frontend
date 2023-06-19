import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SittingRecordsPostBody } from '../../_models/addSittingRecords.model';
import { SittingRecordsService } from './sitting-records.service';
import { CookieService } from 'ngx-cookie-service';

describe('SittingRecordsService', () => {
  let service: SittingRecordsService;
  let httpMock: HttpTestingController;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SittingRecordsService,
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    });

    service = TestBed.inject(SittingRecordsService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postNewSittingRecord', () => {
    it('should send a POST request to the correct URL with the given sitting record data', () => {
      const record: SittingRecordsPostBody = {
        recordedByIdamId: '',
        recordedByName: '',
        recordedSittingRecords: []
      };

      cookieService.get.withArgs('__serviceauth__').and.returnValue('mockS2SToken');
      cookieService.get.withArgs('__auth__').and.returnValue('mockAuthToken');

      service.postNewSittingRecord(record).subscribe();

      const req = httpMock.expectOne('/sittingrecords/add');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ sittingRecords: record });
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');
      expect(req.request.headers.get('Authorization')).toBe('mockAuthToken');
      expect(req.request.headers.get('ServiceAuthorization')).toBe('mockS2SToken');

      req.flush({});
    });
  });
});
