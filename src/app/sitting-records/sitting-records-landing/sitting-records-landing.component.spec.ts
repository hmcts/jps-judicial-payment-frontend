
// Import relevant packages and mock any services or modules as needed
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SittingRecordsLandingComponent } from './sitting-records-landing.component';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('SittingRecordsLandingComponent', () => {
  let component: SittingRecordsLandingComponent;
  let fixture: ComponentFixture<SittingRecordsLandingComponent>;
  let cookieService: CookieService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ SittingRecordsLandingComponent ],
      providers: [ SubmitterWorkflowService,
        { provide: CookieService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SittingRecordsLandingComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);

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
      component.userRole = 'jps-submitter';
      component.userForm.controls['options'].setValue('manageSittingRecords');
      spyOn(router, 'navigate');
      component.submitForm();
  
      expect(router.navigate)
        .toHaveBeenCalledWith(['sittingRecords', 'manage']);
    });

    it('should navigate to submit page for submitter', () => {
      component.userRole = 'jps-submitter';
      component.userForm.controls['options'].setValue('submitToFinance');
      spyOn(router, 'navigate');
      component.submitForm();
  
      expect(router.navigate)
        .toHaveBeenCalledWith(['sittingRecords', 'submit']);
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
