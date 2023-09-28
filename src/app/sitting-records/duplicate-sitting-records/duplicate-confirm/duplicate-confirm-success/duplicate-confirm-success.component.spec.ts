import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateConfirmSuccessComponent } from './duplicate-confirm-success.component';
import { DuplicateRecordWorkflowService } from 'src/app/_workflows/duplicate-record-workflow.service';
import { UserInfoService } from 'src/app/_services/user-info-service/user-info-service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SittingRecordsInfoBannerComponent } from '../../../sitting-records-info-banner/sitting-records-info-banner.component';
import { RecorderWorkflowService } from 'src/app/_workflows/recorder-workflow.service';
import { FormControl, FormGroup } from '@angular/forms';

describe('DuplicateConfirmSuccessComponent', () => {
  let component: DuplicateConfirmSuccessComponent;
  let fixture: ComponentFixture<DuplicateConfirmSuccessComponent>;
  let drWorkFlow: DuplicateRecordWorkflowService;
  let srWorkFlow: RecorderWorkflowService;
  let uInfoSvc: UserInfoService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuplicateConfirmSuccessComponent, SittingRecordsInfoBannerComponent],
      imports: [HttpClientTestingModule],
      providers: [DuplicateRecordWorkflowService, UserInfoService]
    }).compileComponents();

    fixture = TestBed.createComponent(DuplicateConfirmSuccessComponent);
    component = fixture.componentInstance;
    drWorkFlow = TestBed.inject(DuplicateRecordWorkflowService);
    srWorkFlow = TestBed.inject(RecorderWorkflowService)
    uInfoSvc = TestBed.inject(UserInfoService);
    router = TestBed.inject(Router);
  });

  it('should navigate back to start', () => {
    const routerSpy = spyOn(router, 'navigate');
    const expectedRoute = ['sittingRecords', 'view'];

    const mockForm = new FormGroup({
      JOH: new FormControl([
        { johRole: {appointment : "President of Tribunal", appointment_type : "Salaried"}, johName: 'name1' },
        { johRole: {appointment : "Regional Tribunal Judge", appointment_type : "Salaried"}, johName: 'name2' }
      ]),
      period: new FormControl('both')
    });

    srWorkFlow.setCameFromConfirm()
    srWorkFlow.setAddSittingRecords(mockForm)
    const resetConfirmSpy = spyOn(srWorkFlow, 'resetCameFromConfirm')
    const resetAddSrSpy = spyOn(srWorkFlow, 'resetAddSittingRecords')
    
    component.navigateBackToStart();

    expect(resetAddSrSpy).toHaveBeenCalled()
    expect(resetConfirmSpy).toHaveBeenCalled()

    expect(routerSpy).toHaveBeenCalledWith(expectedRoute);
  });

  it('should initialize validRecords and currentUser on ngOnInit', () => {
    const validRecords = ['record1', 'record2'];
    const currentUser = 'John Doe';

    spyOn(drWorkFlow, 'getValidResolvedRecords').and.returnValue(validRecords);
    spyOn(uInfoSvc, 'getUserName').and.returnValue(currentUser);

    component.ngOnInit();

    expect(component.validRecords).toEqual(validRecords);
    expect(component.currentUser).toEqual(currentUser);
  });
});