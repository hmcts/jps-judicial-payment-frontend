import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddSittingRecordSuccessComponent } from './add-sitting-record-success.component';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddSittingRecordSuccessComponent', () => {
  let component: AddSittingRecordSuccessComponent;
  let fixture: ComponentFixture<AddSittingRecordSuccessComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSittingRecordSuccessComponent ],
      imports: [ RouterTestingModule,  HttpClientTestingModule],
      providers: [ SittingRecordWorkflowService, DateService ],
    })
    .compileComponents();
    httpMock= TestBed.inject(HttpTestingController);
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
      venue: [{site_name: 'Venue 1'}],
    });
    
    srWorkflowService.setCameFromConfirm()
    srWorkflowService.setFormData(formDataMock)
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
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

    expect(srWorkflowService.resetAddSittingRecords).toHaveBeenCalled();
    expect(srWorkflowService.resetCameFromConfirm).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

});

