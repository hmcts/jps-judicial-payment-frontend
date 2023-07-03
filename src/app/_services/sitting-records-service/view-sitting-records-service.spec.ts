import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewSittingRecordService } from './view-sitting-records-service';
import { ViewSittingRecordPost, ViewSittingRecordResponse } from '../../_models/viewSittingRecords.model';
import { CookieService } from 'ngx-cookie-service';

describe('ViewSittingRecordService', () => {
  let service: ViewSittingRecordService;
  let httpMock: HttpTestingController;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ViewSittingRecordService,
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    });

    service = TestBed.inject(ViewSittingRecordService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;

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
      epimsId: '',
      createdByUserId: '',
      personalCode: '',
      judgeRoleTypeId: '',
      duration: '',
      dateRangeFrom: '',
      dateRangeTo: '',
      statusIds: []
    };
    const mockResponse: ViewSittingRecordResponse = { "sittingRecords": [] };
    
    cookieService.get.withArgs('__serviceauth__').and.returnValue('mockS2SToken');
    cookieService.get.withArgs('__auth__').and.returnValue('mockAuthToken');
   
    service.postObject(mockDataPost).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/sittingRecords/searchSittingRecords?hmctsServiceCode=BBA3');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockDataPost);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('mockAuthToken');
    expect(req.request.headers.get('ServiceAuthorization')).toBe('mockS2SToken');
    expect(req.request.params.get('hmctsServiceCode')).toBe('BBA3');
    req.flush(mockResponse);
  });
});
