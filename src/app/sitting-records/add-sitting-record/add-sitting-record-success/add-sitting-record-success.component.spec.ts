import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddSittingRecordSuccessComponent } from './add-sitting-record-success.component';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('AddSittingRecordSuccessComponent', () => {
  let component: AddSittingRecordSuccessComponent;
  let fixture: ComponentFixture<AddSittingRecordSuccessComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSittingRecordSuccessComponent ],
      imports: [ RouterTestingModule ],
      providers: [ SittingRecordWorkflowService, DateService ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSittingRecordSuccessComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    srWorkflowService = TestBed.inject(SittingRecordWorkflowService);
    srWorkflowService.setManageVisited();
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: [{court_name: 'Venue 1'}],
    });
    srWorkflowService.setCameFromConfirm()
    srWorkflowService.setFormData(formDataMock)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form data and visited managed flags on navigateBackToStart()', () => {
    spyOn(srWorkflowService, 'resetFormData');
    spyOn(srWorkflowService, 'resetVisitedManaged');
    spyOn(srWorkflowService, 'resetAddSittingRecords');
    spyOn(srWorkflowService, 'resetCameFromConfirm');
    spyOn(router, 'navigate');

    component.navigateBackToStart();

    expect(srWorkflowService.resetFormData).toHaveBeenCalled();
    expect(srWorkflowService.resetVisitedManaged).toHaveBeenCalled();
    expect(srWorkflowService.resetAddSittingRecords).toHaveBeenCalled();
    expect(srWorkflowService.resetCameFromConfirm).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
  });

  it('should initialize tribService, venue, and date on ngOnInit()', () => {
    component.ngOnInit();
    expect(component.tribService).toEqual('Tribunal 1');
    expect(component.venue).toEqual('Venue 1');
  });
});

