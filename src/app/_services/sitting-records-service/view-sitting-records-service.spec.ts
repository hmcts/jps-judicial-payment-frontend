import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewSittingRecordService } from './view-sitting-records-service';
import { ViewSittingRecordPost, ViewSittingRecordResponse } from '../../_models/viewSittingRecords.model';

describe('ViewSittingRecordService', () => {
  let service: ViewSittingRecordService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ViewSittingRecordService,
      ]
    });

    service = TestBed.inject(ViewSittingRecordService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully post an object and receive a response', () => {
    const mockDataPost: ViewSittingRecordPost = {
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
    const mockResponse: ViewSittingRecordResponse = { "sittingRecords": [] };

    service.postObject(mockDataPost, 'BBA3').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/sittingrecord/searchSittingRecords?hmctsServiceCode=BBA3');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockDataPost);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.params.get('hmctsServiceCode')).toBe('BBA3');
    req.flush(mockResponse);
  });
});
