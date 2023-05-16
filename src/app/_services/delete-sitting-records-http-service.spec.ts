import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeleteSittingRecordHttp } from './delete-sitting-records-http-service';

describe('DeleteSittingRecordHttp', () => {
  let service: DeleteSittingRecordHttp;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeleteSittingRecordHttp]
    });
    service = TestBed.inject(DeleteSittingRecordHttp);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a DELETE request and return the response', () => {
    const recordID = '123';
    const responseMock = 'Success';

    service.deleteRecord(recordID).subscribe(response => {
      expect(response).toEqual(responseMock);
    });

    const req = httpMock.expectOne(`/sittingrecords/${recordID}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(responseMock);
  });

  it('should return an empty array if the response is falsy', () => {
    const recordID = '123';

    service.deleteRecord(recordID).subscribe(response => {
      expect(response).toEqual([]);
    });

    const req = httpMock.expectOne(`/sittingrecords/${recordID}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
});
