import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewSittingRecordsComponent } from './view-sitting-records.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('ViewSittingRecordsComponent', () => {
  let component: ViewSittingRecordsComponent;
  let fixture: ComponentFixture<ViewSittingRecordsComponent>;
  let mockSrWorkflowService: SittingRecordWorkflowService
  let mockDateService: { formatDateFromForm: { and: { returnValue: (arg0: string) => void; }; }; };
  let mockRouter: { navigate: unknown; };

  beforeEach(() => {
    mockDateService = jasmine.createSpyObj(['formatDateFromForm']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ ViewSittingRecordsComponent ],
      providers: [
        SittingRecordWorkflowService,
        { provide: DateService, useValue: mockDateService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [RouterTestingModule, DataTablesModule, HttpClientModule]
    })
    .compileComponents();

    mockSrWorkflowService = TestBed.inject(SittingRecordWorkflowService);


    fixture = TestBed.createComponent(ViewSittingRecordsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form data on init', () => {
    const mockFormData: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Mock Tribunal Service'],
      venue: ['Mock Venue'],
    });
    const formattedDate = '01/01/2022';
    mockSrWorkflowService.setFormData(mockFormData)
    mockDateService.formatDateFromForm.and.returnValue(formattedDate);
    fixture.detectChanges();
    expect(mockDateService.formatDateFromForm).toHaveBeenCalledWith(mockFormData.controls['dateSelected'].value);
    expect(component.tribService).toBe(mockFormData.controls['tribunalService'].value);
    expect(component.venue).toBe(mockFormData.controls['venue'].value);
    expect(component.date).toBe(formattedDate);
  });

  it('should navigate to the manage page on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','manage']);
  });

  describe('getPeriod', () => {
    it('should return "Full Day" when am and pm are true', () => {
      expect(component.getPeriod("true", "true")).toEqual('Full Day');
    });
  
    it('should return "Morning" when am is true and pm is false', () => {
      expect(component.getPeriod("true", "false")).toEqual('Morning');
    });
  
    it('should return "Afternoon" when pm is true and am is false', () => {
      expect(component.getPeriod("false", "true")).toEqual('Afternoon');
    });
  
    it('should return an empty string when both am and pm are false', () => {
      expect(component.getPeriod("false", "false")).toEqual('');
    });
  });
});
