import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DuplicateConfirmComponent } from './duplicate-confirm.component';
import { UserInfoService } from '../../../../_services/user-info-service/user-info-service';
import { DuplicateRecordWorkflowService } from 'src/app/_workflows/duplicate-record-workflow.service';
import { Router } from '@angular/router';
import { SittingRecordsInfoBannerComponent } from '../../../sitting-records-info-banner/sitting-records-info-banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DuplicateConfirmComponent', () => {
  let component: DuplicateConfirmComponent;
  let fixture: ComponentFixture<DuplicateConfirmComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let drWorkFlowSpy: jasmine.SpyObj<DuplicateRecordWorkflowService>;
  let uInfoSvcSpy: jasmine.SpyObj<UserInfoService>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const drWorkFlowSpyObj = jasmine.createSpyObj('DuplicateRecordWorkflowService', ['getResolvedDuplicateSelections', 'setValidResolvedRecords', 'postResolvedDuplicates', 'setErrorRecords']);
    const uInfoSvcSpyObj = jasmine.createSpyObj('UserInfoService', ['getUserName']);

    await TestBed.configureTestingModule({
      declarations: [ DuplicateConfirmComponent, SittingRecordsInfoBannerComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: DuplicateRecordWorkflowService, useValue: drWorkFlowSpyObj },
        { provide: UserInfoService, useValue: uInfoSvcSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DuplicateConfirmComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    drWorkFlowSpy = TestBed.inject(DuplicateRecordWorkflowService) as jasmine.SpyObj<DuplicateRecordWorkflowService>;
    uInfoSvcSpy = TestBed.inject(UserInfoService) as jasmine.SpyObj<UserInfoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize confirmationRecords and currentUser on ngOnInit', () => {
    const mockConfirmationRecords = { submitting: [] };
    const mockCurrentUser = 'John Doe';

    drWorkFlowSpy.getResolvedDuplicateSelections.and.returnValue(mockConfirmationRecords);
    uInfoSvcSpy.getUserName.and.returnValue(mockCurrentUser);

    component.ngOnInit();

    expect(component.confirmationRecords).toEqual(mockConfirmationRecords);
    expect(component.currentUser).toEqual(mockCurrentUser);
  });

  it('should navigate to "sittingRecords/addDuplicates" on goBack', () => {
    component.goBack();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['sittingRecords', 'addDuplicates']);
  });

  it('should navigate to "sittingRecords/view" on cancelConfirm', () => {
    component.cancelConfirm();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

  it('should set valid resolved records and navigate to "sittingRecords/confirmDupeSuccess" if response is successful', () => {
    const mockResponse = { errorRecords: [] };
    const mockSubmittingRecords = [];

    drWorkFlowSpy.postResolvedDuplicates.and.returnValue(of(mockResponse));

    component.confirmationRecords = { submitting: mockSubmittingRecords };
    component.submitRecords();

    expect(drWorkFlowSpy.setValidResolvedRecords).toHaveBeenCalledWith(mockSubmittingRecords);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['sittingRecords', 'confirmDupeSuccess']);
  });

  it('should set error records and navigate to "sittingRecords/addDuplicates" if response has error records', () => {
    const mockResponse = { message: 'Error', errorRecords: [] };
    const mockSubmittingRecords = [{errorCode:'POTENTIAL_DUPLICATE_RECORD'}];

    drWorkFlowSpy.postResolvedDuplicates.and.returnValue(of(mockResponse));

    component.confirmationRecords = { submitting: mockSubmittingRecords };
    component.submitRecords();

    expect(drWorkFlowSpy.setErrorRecords).toHaveBeenCalledWith(mockResponse.errorRecords);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['sittingRecords', 'addDuplicates']);
  });
});