import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewSittingRecordsComponent } from './view-sitting-records.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';

describe('ViewSittingRecordsComponent', () => {
  let component: ViewSittingRecordsComponent;
  let fixture: ComponentFixture<ViewSittingRecordsComponent>;
  let mockSrWorkflowService: { getFormData: { and: { returnValue: (arg0: { value: { dateSelected: { dateDay: string; dateMonth: string; dateYear: string; }; tribunalService: string; venue: {site_name: string;} }; }) => void; }; }; };
  let mockDateService: { formatDateFromForm: { and: { returnValue: (arg0: string) => void; }; }; };
  let mockRouter: { navigate: unknown; };

  beforeEach(() => {
    mockSrWorkflowService = jasmine.createSpyObj(['getFormData']);
    mockDateService = jasmine.createSpyObj(['formatDateFromForm']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ ViewSittingRecordsComponent ],
      providers: [
        { provide: SittingRecordWorkflowService, useValue: mockSrWorkflowService },
        { provide: DateService, useValue: mockDateService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSittingRecordsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form data on init', () => {
    const mockFormData = {
      dateSelected: {
        dateDay: '01',
        dateMonth: '01',
        dateYear: '2022'
      },
      tribunalService: 'Mock Tribunal Service',
      venue: {site_name: 'Mock Venue'}
    };
    const formattedDate = '01/01/2022';
    mockSrWorkflowService.getFormData.and.returnValue({ value: mockFormData });
    mockDateService.formatDateFromForm.and.returnValue(formattedDate);
    fixture.detectChanges();
    expect(mockSrWorkflowService.getFormData).toHaveBeenCalled();
    expect(mockDateService.formatDateFromForm).toHaveBeenCalledWith(mockFormData.dateSelected);
    expect(component.tribService).toBe(mockFormData.tribunalService);
    expect(component.venue).toBe(mockFormData.venue.site_name);
    expect(component.date).toBe(formattedDate);
  });

  it('should navigate to the manage page on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords','manage']);
  });
});
