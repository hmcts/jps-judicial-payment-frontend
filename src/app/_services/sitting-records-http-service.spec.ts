import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sittingRecordsPostBody } from '../_models/addSIttingRecords';
import { SittingRecordsHttpService } from './sitting-records-http-service';

describe('SittingRecordsHttpService', () => {
  let service: SittingRecordsHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SittingRecordsHttpService],
    });

    service = TestBed.inject(SittingRecordsHttpService);
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
      const record: sittingRecordsPostBody = {
          postedSittingRecords: []
      };
      service.postNewSittingRecord(record).subscribe();

      const req = httpMock.expectOne('url');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(record);
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');

      req.flush({});
    });
  });
});
