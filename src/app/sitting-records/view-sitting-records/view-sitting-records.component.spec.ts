import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewSittingRecordsComponent } from './view-sitting-records.component';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewSittingRecordResponse } from '../../_models/viewSittingRecords.model';
import { of } from 'rxjs';
import { SittingRecordsInfoBannerComponent } from '../../sitting-records-info-banner/sitting-records-info-banner.component'
import { SittingRecordWorkflowService } from 'src/app/_workflows/sitting-record-workflow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewSittingRecordsComponent', () => {
  let component: ViewSittingRecordsComponent;
  let fixture: ComponentFixture<ViewSittingRecordsComponent>;
  let mockRouter: Router;
  let mockSRWorkflowService: SittingRecordWorkflowService;
  let mockDateSvc: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSittingRecordsComponent, SittingRecordsInfoBannerComponent ],
      providers: [ SittingRecordWorkflowService, DateService ],
      imports: [RouterTestingModule, DataTablesModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSittingRecordsComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockSRWorkflowService = TestBed.inject(SittingRecordWorkflowService);
    mockDateSvc = TestBed.inject(DateService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form data on init', () => {
    const formattedDate = '2022-01-01';
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: { site_name: 'Venue 1' }
    });
    const response: ViewSittingRecordResponse = {
      "sittingRecords": []
    }

    mockSRWorkflowService.setFormData(formDataMock);
    fixture.detectChanges();
    spyOn(mockDateSvc, 'formatDateFromForm').and.returnValue(formattedDate);
    spyOn(mockSRWorkflowService, 'getSittingRecordsData').and.returnValue(of(response));
    
    component.ngOnInit();
    
    expect(mockDateSvc.formatDateFromForm).toHaveBeenCalledWith(formDataMock.controls['dateSelected'].value);
    expect(component.tribService).toBe(formDataMock.controls['tribunalService'].value);
    expect(component.venueSiteName).toBe(formDataMock.controls['venue'].value.site_name);
    expect(component.date).toBe(formattedDate);
    expect(component.sittingRecordData).toBe(response.sittingRecords);
  });

  it('should navigate to the manage page on goBack', () => {
    spyOn(mockRouter, 'navigate');
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','manage']);
  });

  it('getPeriod should convert the period correctly', () => {
    spyOn(mockDateSvc,'getPeriod').and.returnValue('Full Day');
    expect(component.getPeriod('AM','PM')).toEqual('Full Day');
    expect(mockDateSvc.getPeriod).toHaveBeenCalledWith('AM','PM');
  
  });

});
