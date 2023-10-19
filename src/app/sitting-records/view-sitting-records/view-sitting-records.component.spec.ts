import { ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewSittingRecordsComponent } from './view-sitting-records.component';
import { RecorderWorkflowService } from '../../_workflows/recorder-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewSittingRecordResponse } from '../../_models/viewSittingRecords.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SittingRecordsInfoBannerComponent } from '../sitting-records-info-banner/sitting-records-info-banner.component';

describe('ViewSittingRecordsComponent', () => {
  let component: ViewSittingRecordsComponent;
  let fixture: ComponentFixture<ViewSittingRecordsComponent>;
  let mockRouter: Router;
  let mockWorkflowService: RecorderWorkflowService;
  let mockDateSvc: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSittingRecordsComponent, SittingRecordsInfoBannerComponent ],
      providers: [ RecorderWorkflowService, DateService ],
      imports: [RouterTestingModule, DataTablesModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSittingRecordsComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockWorkflowService = TestBed.inject(RecorderWorkflowService);
    mockDateSvc = TestBed.inject(DateService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form data on init', () => {
    const formattedDate = '2022-01-01';
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: [{service: 'Tribunal 1'}],
      venue: { site_name: 'Venue 1' }
    });
    const response: ViewSittingRecordResponse = {
      "recordCount": 1,
      "sittingRecords": []
    }

    mockWorkflowService.setFormData(formDataMock);
    fixture.detectChanges();
    spyOn(mockDateSvc, 'formatDateFromForm').and.returnValue(formattedDate);
    spyOn(mockWorkflowService, 'getSittingRecordsData').and.returnValue(of(response));
    spyOn(mockWorkflowService, 'getFormData').and.returnValue(formDataMock)
    
    component.ngOnInit();
  
    expect(mockWorkflowService.getFormData).toHaveBeenCalled();
    expect(mockDateSvc.formatDateFromForm).toHaveBeenCalledWith(formDataMock.controls['dateSelected'].value);
    expect(component.tribService).toBe(formDataMock.controls['tribunalService'].value.service);
    expect(component.venueSiteName).toBe(formDataMock.controls['venue'].value.site_name);
    expect(component.date).toBe(formattedDate);

    expect(component.sittingRecordData).toEqual(response.sittingRecords);
    
  });

  it('should execute ajaxFunction correctly', () => {
    // Arrange
    const fakeDataTablesParams = { start: 0 };
    const fakeCallback = jasmine.createSpy('fakeCallback');
    const response: ViewSittingRecordResponse = {
      recordCount: 1,
      sittingRecords: []
    };
    spyOn(mockWorkflowService, 'getSittingRecordsData').and.returnValue(of(response));
  
    // Act
    component.getViewTableData(fakeDataTablesParams, fakeCallback);
  
    // Assert
    expect(fakeCallback).toHaveBeenCalledWith({
      recordsTotal: response.recordCount,
      recordsFiltered: response.recordCount,
      data: []
    });
    expect(mockWorkflowService.getSittingRecordsData).toHaveBeenCalledWith(fakeDataTablesParams.start);
  });
  

  it('should navigate to the manage page on goBack', () => {
    spyOn(mockRouter, 'navigate');
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','manage']);
  });

  it('should navigate to sittingRecords/delete on navigateDeleteSittingRecord', () => {
    spyOn(mockRouter, 'navigate')
    spyOn(mockWorkflowService, 'setSittingRecordToDelete')
    component.navigateDeleteSittingRecord(mockRecord)
    expect(mockWorkflowService.setSittingRecordToDelete).toHaveBeenCalledWith(mockRecord)
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','delete'])
  })

  it('should navigate to sittingRecords/add on addNewRecord', () => {
    spyOn(mockRouter, 'navigate')
    component.addNewRecord()
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','add'])
  })

});

const mockRecord ={  
  sittingRecordId: 'string',
  sittingDate: 'string',
  statusId: 'string',
  regionId: 'string',
  regionName: 'string',
  epimmsId: 'string',
  hmctsServiceId: 'string',
  personalCode: 'string',
  personalName: 'string',
  contractTypeId: 0,
  judgeRoleTypeId: 'string',
  am: true,
  pm: false,
  createdDateTime: 'string',
  createdByUserId: 'string',
  createdByUserName: 'string',
  changedDateTime: 'string',
  changedByUserId: 'string',
  changedByUserName: 'string',
  venueName: 'string',
}