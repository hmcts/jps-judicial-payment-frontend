import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewSittingRecordHttp } from '../_services/view-sitting-records-http-service';
import { ViewSittingRecordPost } from '../_models/view-sitting-records-post';

describe('ViewSittingRecordHttp', () => {
  let service: ViewSittingRecordHttp;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewSittingRecordHttp]
    });

    service = TestBed.inject(ViewSittingRecordHttp);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully post an object and receive a response', () => {
    const mockData: ViewSittingRecordPost = {
        pageSize: 100,
        offset: 0,
        dateOrder: 'ASCENDING',
        regionId: '',
        epimmsId: '',
        createdByUserId: '',
        personalCode: '',
        judgeRoleTypeId: '',
        duration: '',
        dateRangeFrom: '',
        dateRangeTo: '',
        statusIds: []
    };
    const mockResponse = { /* your mock response here */ };

    service.postObject(mockData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(service['viewRecordsURL']);
    expect(request.request.method).toBe('POST');
    request.flush(mockResponse);
  });

  it('should return an empty array when the response is falsy', () => {
    const mockData: ViewSittingRecordPost = {
        pageSize: 100,
        offset: 0,
        dateOrder: 'ASCENDING',
        regionId: '',
        epimmsId: '',
        createdByUserId: '',
        personalCode: '',
        judgeRoleTypeId: '',
        duration: '',
        dateRangeFrom: '',
        dateRangeTo: '',
        statusIds: []
    };
    const mockResponse = null;

    service.postObject(mockData).subscribe(response => {
      expect(response).toEqual([]);
    });

    const request = httpMock.expectOne(service['viewRecordsURL']);
    expect(request.request.method).toBe('POST');
    request.flush(mockResponse);
  });
});
