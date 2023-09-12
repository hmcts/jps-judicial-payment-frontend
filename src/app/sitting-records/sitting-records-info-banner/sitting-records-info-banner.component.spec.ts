import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SittingRecordsInfoBannerComponent } from './sitting-records-info-banner.component';
import { ManageSittingRecordsWorkflowService } from '../../_workflows/manage-sitting-record-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

describe('SittingRecordsInfoBannerComponent', () => {
  let component: SittingRecordsInfoBannerComponent;
  let fixture: ComponentFixture<SittingRecordsInfoBannerComponent>;
  let srWorkFlowService: ManageSittingRecordsWorkflowService;
  let dateService: DateService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SittingRecordsInfoBannerComponent],
      providers: [ManageSittingRecordsWorkflowService, DateService, FormBuilder],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SittingRecordsInfoBannerComponent);
    component = fixture.componentInstance;
    srWorkFlowService = TestBed.inject(ManageSittingRecordsWorkflowService);
    dateService = TestBed.inject(DateService);
    formBuilder = TestBed.inject(FormBuilder);

    const mockFormData = formBuilder.group({
      tribunalService: { service: 'service 1' },
      venue: { site_name: 'site 1' },
      dateSelected: formBuilder.group({
        dateDay: '01',
        dateMonth: '02',
        dateYear: '2022',
      }),
    });

    spyOn(srWorkFlowService, 'getFormData').and.returnValue(mockFormData);
    spyOn(dateService, 'formatDateFromForm').and.returnValue('01/02/2022');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the form data on init', () => {
    component.ngOnInit();

    expect(srWorkFlowService.getFormData).toHaveBeenCalled();
    expect(component.tribService).toBe('service 1');
    expect(component.venue).toBe('site 1');
    expect(component.date).toBe('01/02/2022');
  });
});
