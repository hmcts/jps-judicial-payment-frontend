import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';
import { of, throwError } from 'rxjs';
import { ViewSittingRecordResponse } from '../../_models/viewSittingRecords.model';
import { DateService } from '../../_services/date-service/date-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { SubmitSittingRecordsComponent } from './submit-sitting-records.component';

describe('SubmitSittingRecordsComponent', () => {
  let component: SubmitSittingRecordsComponent;
  let fixture: ComponentFixture<SubmitSittingRecordsComponent>;
  let mockRouter: Router;
  let mockWorkflowService: SubmitterWorkflowService;
  let mockDateSvc: DateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitSittingRecordsComponent ],
      providers: [ SubmitterWorkflowService, DateService ],
      imports: [RouterTestingModule, DataTablesModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitSittingRecordsComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockWorkflowService = TestBed.inject(SubmitterWorkflowService);
    mockDateSvc = TestBed.inject(DateService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form data on init', () => {
    const formattedDate = '2022-01-01';
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: [{service:'Tribunal 1'}],
      region: { description: 'Region 1' }
    });
    const response: ViewSittingRecordResponse = {
      "sittingRecords": []
    }

    mockWorkflowService.setFormData(formDataMock);
    fixture.detectChanges();
    spyOn(mockDateSvc, 'formatDateFromForm').and.returnValue(formattedDate);
    spyOn(mockWorkflowService, 'getSittingRecordsData').and.returnValue(of(response));
    
    component.ngOnInit();
    
    expect(mockDateSvc.formatDateFromForm).toHaveBeenCalledWith(formDataMock.controls['dateSelected'].value);
    expect(component.tribService).toBe(formDataMock.controls['tribunalService'].value.service);
    expect(component.region).toBe(formDataMock.controls['region'].value.description);
    expect(component.date).toBe(formattedDate);
    expect(component.sittingRecordData).toEqual(response.sittingRecords);
  });

  it('should navigate to the home page on goBack', () => {
    spyOn(mockRouter, 'navigate');
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','home']);
  });

  it('should correctly load sitting records data', () => {
    const mockResponse: ViewSittingRecordResponse = {
      sittingRecords: [],
      recordCount: 0
    };

    spyOn(mockWorkflowService, 'getSittingRecordsData').and.returnValue(of(mockResponse));
    const callback = jasmine.createSpy("callback");

    component.loadSittingRecordsData(0, callback);
    
    expect(component.apiError).toBeFalse();
    expect(component.sittingRecordData).toEqual(mockResponse.sittingRecords);
    expect(component.recordCount).toBe(mockResponse.recordCount);
    expect(callback).toHaveBeenCalledWith({
      recordsTotal: mockResponse.recordCount,
      recordsFiltered: mockResponse.recordCount,
      data: []
    });
  });

  it('should handle error on loading sitting records data', () => {
    spyOn(mockWorkflowService, 'getSittingRecordsData').and.returnValue(throwError(() => new Error('Error')));
    const callback = jasmine.createSpy("callback");

    component.loadSittingRecordsData(0, callback);

    expect(component.apiError).toBeTrue();
    expect(component.recordCount).toBe(0);
  });
  
});
