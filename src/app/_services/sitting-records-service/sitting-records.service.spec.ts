import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SittingRecordsPostBody } from '../../_models/addSittingRecords.model';
import { SittingRecordsService } from './sitting-records.service';
import { CookieService } from 'ngx-cookie-service';

describe('SittingRecordsService', () => {
  let service: SittingRecordsService;
  let httpMock: HttpTestingController;

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

      service.postNewSittingRecord(record).subscribe();

      const req = httpMock.expectOne('/sittingrecord/add');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ sittingRecords: record });
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');

      req.flush({});
    });
  });

  describe('getPeriodValues', () => {
    it('should return true for FULL_DAY', () => {
      const value = 'FULL_DAY';
      const result = service.getPeriodValues(value, 'am');
      expect(result).toBeTrue();
    });

    it('should return true for AM when time is am', () => {
      const value = 'AM';
      const result = service.getPeriodValues(value, 'am');
      expect(result).toBeTrue();
    });

    it('should return true for PM when time is pm', () => {
      const value = 'PM';
      const result = service.getPeriodValues(value, 'pm');
      expect(result).toBeTrue();
    });

    it('should return false for any other combination', () => {
      const value = 'AM';
      const result = service.getPeriodValues(value, 'pm');
      expect(result).toBeFalse();
    });

  })
});
