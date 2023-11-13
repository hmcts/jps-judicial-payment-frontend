
// Import relevant packages and mock any services or modules as needed
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SittingRecordsLandingComponent } from './sitting-records-landing.component';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { PublisherWorkflowService } from 'src/app/_workflows/publisher-workflow.service';

describe('SittingRecordsLandingComponent', () => {
  let component: SittingRecordsLandingComponent;
  let fixture: ComponentFixture<SittingRecordsLandingComponent>;
  let cookieService: CookieService;
  let router: Router;
  let pbWorkflow: PublisherWorkflowService
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ SittingRecordsLandingComponent ],
      providers: [ SubmitterWorkflowService, PublisherWorkflowService,
        { provide: CookieService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SittingRecordsLandingComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    pbWorkflow = TestBed.inject(PublisherWorkflowService)
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

    it('should set johFormValid to true when called with true', () => {
      component.handleFormValidChange([true, 'johAdmin'])
      expect(component.johAdminFormValid).toBeTrue()
    })

    it('should set compareRecords to true when called with true', () => {
      component.handleFormValidChange([true, 'compareRecords'])
      expect(component.compareFormValid).toBeTrue()
    })
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
    

    it('should navigate to publish page for publisher', () => {
      component.userRole = 'jps-publisher';
      component.userForm.controls['options'].setValue('publishRecords');
      spyOn(pbWorkflow, 'setFormData')

      component.submitForm()
      expect(pbWorkflow.setFormData).toHaveBeenCalled()
    });

    it('should navigate to compareRecords page for submitter', () => {
      component.userRole = 'jps-submitter';
      component.userForm.controls['options'].setValue('compareSittingRecords');
      spyOn(router, 'navigate');

      component.submitForm()
      expect(router.navigate)
        .toHaveBeenCalledWith([]);
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
      expect(component.showCompareSittingRecords).toBeTrue()
  
      // Test for other roles
      component.userRole = 'other-role';
      component.configureUserRoleSettings();
      expect(component.showFindAddDeleteSittingRecordsOption).toBeTrue();
    });
  });
});
