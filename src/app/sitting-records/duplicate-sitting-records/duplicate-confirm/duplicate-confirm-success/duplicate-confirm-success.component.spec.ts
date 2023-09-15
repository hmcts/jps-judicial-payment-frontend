import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateConfirmSuccessComponent } from './duplicate-confirm-success.component';
import { DuplicateRecordWorkflowService } from 'src/app/_workflows/duplicate-record-workflow.service';
import { UserInfoService } from 'src/app/_services/user-info-service/user-info-service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SittingRecordsInfoBannerComponent } from '../../../sitting-records-info-banner/sitting-records-info-banner.component';

describe('DuplicateConfirmSuccessComponent', () => {
  let component: DuplicateConfirmSuccessComponent;
  let fixture: ComponentFixture<DuplicateConfirmSuccessComponent>;
  let drWorkFlow: DuplicateRecordWorkflowService;
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
    uInfoSvc = TestBed.inject(UserInfoService);
    router = TestBed.inject(Router);
  });

  it('should navigate back to start', () => {
    const routerSpy = spyOn(router, 'navigate');
    const expectedRoute = ['sittingRecords', 'view'];

    component.navigateBackToStart();

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