
// Import relevant packages and mock any services or modules as needed
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { SittingRecordsLandingComponent } from './sitting-records-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LandingWorkflowService } from 'src/app/_workflows/landing-workflow.service';
import { of } from 'rxjs';

describe('SittingRecordsLandingComponent', () => {
  let component: SittingRecordsLandingComponent;
  let fixture: ComponentFixture<SittingRecordsLandingComponent>;
  let cookieService: CookieService;
  let router: Router;
  let landingWorkflow: LandingWorkflowService
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SittingRecordsLandingComponent ],
      providers: [
        FormBuilder,
        CookieService,
        SubmitterWorkflowService,
        PublisherWorkflowService,
        AdminWorkflowService
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SittingRecordsLandingComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    landingWorkflow = TestBed.inject(LandingWorkflowService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleFormValidChange', () => {
    it('should set submitterFormValid to true when called with true', () => {
      component.handleFormValidChange([true, 'submitter']);
      expect(component.submitterFormValid).toBeTrue();
    });

    it('should set submitterFormValid to false when called with false', () => {
      component.handleFormValidChange([false, 'submitter']);
      expect(component.submitterFormValid).toBeFalse();
    });
  
    it('should set publisherFormValid to true when called with true', () => {
      component.handleFormValidChange([true, 'publisher']);
      expect(component.publisherFormValid).toBeTrue();
    });

    it('should set publisherFormValid to false when called with false', () => {
      component.handleFormValidChange([false, 'publisher']);
      expect(component.publisherFormValid).toBeFalse();
    });

    it('should set johAdminFormValid to true when called with true', () => {
      component.handleFormValidChange([true, 'johAdmin']);
      expect(component.johAdminFormValid).toBeTrue();
    });

    it('should set johAdminFormValid to false when called with false', () => {
      component.handleFormValidChange([false, 'johAdmin']);
      expect(component.johAdminFormValid).toBeFalse();
    });
  });

  describe('handleFormValues', () => {
    it('should set submitterFormValues when called with submitter', () => {
      const value = ['submitterValue', 'submitter'];
      component.handleFormValues(value);
      expect(component.submitterFormValues).toEqual('submitterValue');
    });

    it('should set publisherFormValues when called with publisher', () => {
      const value = ['publisherValue', 'publisher'];
      component.handleFormValues(value);
      expect(component.publisherFormValues).toEqual('publisherValue');
    });

    it('should set johAdminFormValues when called with johAdmin', () => {
      const value = ['johAdminValue', 'johAdmin'];
      component.handleFormValues(value);
      expect(component.johAdminFormValues).toEqual('johAdminValue');
    });
  });

  describe('ngOnInit', () => {
    it('should initialize userRole from cookies', () => {
      spyOn(cookieService, 'get').and.returnValue('jps-JOH-admin');
      component.ngOnInit();
      expect(component.userRole).toEqual('jps-JOH-admin');
    });

  });

  describe('submitForm', () => {

    it('should navigate to manage records page for submitter', () => {
      component.userForm.controls['options'].setValue('viewManageJudicialInfo');
      spyOn(landingWorkflow, 'setupWorkflows').and.returnValue(of())
      spyOn(router, 'navigate');
      component.submitForm();
  
      expect(router.navigate)
        .toHaveBeenCalledWith(['sittingRecords', 'manageJudicial']);
    });

    it('should navigate to manage records page for submitter', () => {
      component.userForm.controls['options'].setValue('submitToFinance');
      spyOn(landingWorkflow, 'setupWorkflows').and.returnValue(of())
      spyOn(router, 'navigate');
      component.submitForm();
  
      expect(router.navigate)
        .toHaveBeenCalledWith(['sittingRecords', 'submit']);
    });

    it('should navigate to manage records page for submitter', () => {
      component.userForm.controls['options'].setValue('manageSittingRecords');
      spyOn(landingWorkflow, 'setupWorkflows').and.returnValue(of())
      spyOn(router, 'navigate');
      component.submitForm();
  
      expect(router.navigate)
        .toHaveBeenCalledWith(['sittingRecords', 'manage']);
    });
    
  });

  describe('configureUserRoleSettings', () => {
    it('should set properties based on user role', () => {
      // Test for 'jps-JOH-admin' role
      component.userRole = 'jps-JOH-admin';
      component.ngOnInit();
      // Add assertions for properties that should be set for 'jps-JOH-admin' role
  
      // Test for 'jps-publisher' role
      component.userRole = 'jps-publisher';
      component.configureUserRoleSettings();
      expect(component.showHeadingForPublisher).toBeTrue();
      expect(component.showViewExportSittingRecordsOption).toBeTrue();
      expect(component.showCreatePayrollFilePublishSittingRecordsOption).toBeTrue();
  
      // Test for 'jps-submitter' role
      component.userRole = 'jps-submitter';
      component.configureUserRoleSettings();
      expect(component.showFindAddDeleteSittingRecordsOption).toBeTrue();
      expect(component.showSubmitSittingRecordsOption).toBeTrue();
  
      // Test for other roles
      component.userRole = 'other-role';
      component.configureUserRoleSettings();
      expect(component.showFindAddDeleteSittingRecordsOption).toBeTrue();
    });
  });
});
