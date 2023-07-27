import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SittingRecordsLandingComponent } from './sitting-records-landing.component';
import { SittingRecordsLandingManageRecordsSubmitterComponent } from './sitting-records-landing-manage-records-submitter/sitting-records-landing-manage-records-submitter.component';
import { SittingRecordsLandingManageRecordsPublisherComponent } from './sitting-records-landing-manage-records-publisher/sitting-records-landing-manage-records-publisher.component';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { TribunalServiceComponent } from '../shared-components/tribunal-service/tribunal-service.component';
import { RegionComponent } from '../shared-components/region/region.component';
import { SittingDateComponent } from '../shared-components/sitting-date/sitting-date.component';

describe('SittingRecordsLandingComponent', () => {
  let component: SittingRecordsLandingComponent;
  let fixture: ComponentFixture<SittingRecordsLandingComponent>;
  let mockRouter: Router;
  let mockSubmitterWorkflowService: SubmitterWorkflowService;
  let mockPublisherWorkflowService: PublisherWorkflowService;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [ SittingRecordsLandingComponent,  SittingRecordsLandingManageRecordsSubmitterComponent, SittingRecordsLandingManageRecordsPublisherComponent,
        TribunalServiceComponent, RegionComponent, SittingDateComponent ],
      providers: [ SubmitterWorkflowService, PublisherWorkflowService,
        { provide: CookieService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockSubmitterWorkflowService = TestBed.inject(SubmitterWorkflowService);
    mockPublisherWorkflowService = TestBed.inject(PublisherWorkflowService);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show FindAddDeleteSittingRecordsOption, SubmitSittingRecordsOption, ViewExportSittingRecordsOption and CreatePayrollFilePublishSittingRecordsOption if jps-JOH-admin role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-JOH-admin');
    component.ngOnInit();
    expect(component.showHeadingForPublisher).toEqual(false);
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(false);
    expect(component.showSubmitSittingRecordsOption).toEqual(false);
    expect(component.showViewExportSittingRecordsOption).toEqual(false);
    expect(component.showCreatePayrollFilePublishSittingRecordsOption).toEqual(false);
  });

  it('should not show FindAddDeleteSittingRecordsOption and SubmitSittingRecordsOption if jps-publisher role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-publisher');
    component.ngOnInit();
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(false);
    expect(component.showSubmitSittingRecordsOption).toEqual(false);
  });

  it('should show FindAddDeleteSittingRecordsOption and SubmitSittingRecordsOption if jps-submitter role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-submitter');
    component.ngOnInit();
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(true);
    expect(component.showSubmitSittingRecordsOption).toEqual(true);
  });

  it('should not show ViewExportSittingRecordsOption and CreatePayrollFilePublishSittingRecordsOption if jps-submitter role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-submitter');
    component.ngOnInit();
    expect(component.showHeadingForPublisher).toEqual(false);
    expect(component.showViewExportSittingRecordsOption).toEqual(false);
    expect(component.showCreatePayrollFilePublishSittingRecordsOption).toEqual(false);
  });

  it('should show ViewExportSittingRecordsOption and CreatePayrollFilePublishSittingRecordsOption if jps-publisher role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-publisher');
    component.ngOnInit();
    expect(component.showHeadingForPublisher).toEqual(true);
    expect(component.showViewExportSittingRecordsOption).toEqual(true);
    expect(component.showCreatePayrollFilePublishSittingRecordsOption).toEqual(true);
  });

  it('should show only FindAddDeleteSittingRecordsOption if jps-admin role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-admin');
    component.ngOnInit();
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(true);
    expect(component.showHeadingForPublisher).toEqual(false);
    expect(component.showSubmitSittingRecordsOption).toEqual(false);
    expect(component.showViewExportSittingRecordsOption).toEqual(false);
    expect(component.showCreatePayrollFilePublishSittingRecordsOption).toEqual(false);
  });

  it('should select correct options when submitter user returns to the page', () => {
    const mockUserFormData: FormGroup = new FormBuilder().group({
      options: ['opt2'],
    });

    spyOn(mockSubmitterWorkflowService, 'getUserFormData').and.returnValue(mockUserFormData);
    component.ngOnInit();
    expect(component.hideManageRecordsSubmitter).toEqual(false);
  });

  it('should select correct options when publisher user returns to the page', () => {
    const mockUserFormData: FormGroup = new FormBuilder().group({
      options: ['opt4'],
    });

    spyOn(mockPublisherWorkflowService, 'getUserFormData').and.returnValue(mockUserFormData);
    component.ngOnInit();
    expect(component.hideManageRecordsPublisher).toEqual(false);
  });

  it('should hide manageRecordsSubmitter section when FindAddDeleteSittingRecordsOption is selected', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt1');
    options.valueChanges.subscribe(result => expect(component.hideManageRecordsSubmitter).toEqual(true));
  });

  it('should not hide manageRecordsSubmitter section when SubmitSittingRecordsOption is selected', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt2');
    options.valueChanges.subscribe(result => expect(component.hideManageRecordsSubmitter).toEqual(false));
  });

  it('should hide manageRecordsPublisher section when ViewExportSittingRecordsOption is selected', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt3');
    options.valueChanges.subscribe(result => expect(component.hideManageRecordsPublisher).toEqual(true));
  });

  it('should not hide manageRecordsPublisher section when CreatePayrollFilePublishSittingRecordsOption is selected', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt4');
    options.valueChanges.subscribe(result => expect(component.hideManageRecordsPublisher).toEqual(false));
  });

  it('should navigate to manage-sitting-records when Opt-1 is selected and the form is submitted', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt1');
    spyOn(mockRouter, 'navigate');
 
    component.submitForm();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
  });

  it('should navigate to submit-sitting-records when Opt-2 is selected and the form is submitted by Submiiter role', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt2');
    spyOn(mockSubmitterWorkflowService, 'setUserFormData');
    spyOn(mockSubmitterWorkflowService, 'setFormData');
    spyOn(mockSubmitterWorkflowService, 'setLandingVisited');
    spyOn(mockRouter, 'navigate');

    component.submitForm();

    expect(mockSubmitterWorkflowService.setUserFormData).toHaveBeenCalled();
    expect(mockSubmitterWorkflowService.setFormData).toHaveBeenCalled();
    expect(mockSubmitterWorkflowService.setLandingVisited).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'submit']);
  });

  /* Add a navigate line when it is known */
  it('should navigate to xxxxx when Opt-4 is selected and the form is submitted by Publisher role', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt4');
    spyOn(mockPublisherWorkflowService, 'setUserFormData');
    spyOn(mockPublisherWorkflowService, 'setFormData');
    spyOn(mockPublisherWorkflowService, 'setLandingVisited');
    //spyOn(mockRouter, 'navigate');

    component.submitForm();

    expect(mockPublisherWorkflowService.setUserFormData).toHaveBeenCalled();
    expect(mockPublisherWorkflowService.setFormData).toHaveBeenCalled();
    expect(mockPublisherWorkflowService.setLandingVisited).toHaveBeenCalled();
    //expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', '']);
  });
});
