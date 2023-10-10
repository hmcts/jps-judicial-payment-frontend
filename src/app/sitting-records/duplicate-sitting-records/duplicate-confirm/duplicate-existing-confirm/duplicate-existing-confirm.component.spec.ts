import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SittingRecordsInfoBannerComponent } from '../../../sitting-records-info-banner/sitting-records-info-banner.component'
import { DuplicateExistingConfirmComponent } from './duplicate-existing-confirm.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConvertAddPeriodPipe, ConvertToStringPeriodPipe } from '../../../../_pipes/convert-period-pipe'
import { Router } from '@angular/router';
import { RecorderWorkflowService } from 'src/app/_workflows/recorder-workflow.service';
import { FormControl, FormGroup } from '@angular/forms';

describe('DuplicateExistingConfirmComponent', () => {
  let component: DuplicateExistingConfirmComponent;
  let fixture: ComponentFixture<DuplicateExistingConfirmComponent>;
  let router: Router;
  let srWorkflow: RecorderWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DuplicateExistingConfirmComponent, SittingRecordsInfoBannerComponent, ConvertAddPeriodPipe, ConvertToStringPeriodPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicateExistingConfirmComponent);
    router = TestBed.inject(Router);
    srWorkflow = TestBed.inject(RecorderWorkflowService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to view', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const mockAddObject = new FormGroup({
      JOH: new FormControl([
        { johRole: {appointment : "President of Tribunal", appointment_type : "Salaried"}, johName: 'name1' },
        { johRole: {appointment : "Regional Tribunal Judge", appointment_type : "Salaried"}, johName: 'name2' }
      ]),
      period: new FormControl('both')
    });

    spyOn(srWorkflow, 'resetCameFromConfirm');
    srWorkflow.setAddSittingRecords(mockAddObject);
    srWorkflow.setCameFromConfirm();

    component.navigateBackToView();
    
    expect(navigateSpy).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

});
