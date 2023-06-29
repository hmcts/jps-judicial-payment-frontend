import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SittingRecordsLandingComponent } from './sitting-records-landing.component';
import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing-manage-records/sitting-records-landing-manage-records.component';
import { CookieService } from 'ngx-cookie-service';

describe('SittingRecordsLandingComponent', () => {
  let component: SittingRecordsLandingComponent;
  let fixture: ComponentFixture<SittingRecordsLandingComponent>;
  let mockRouter: Router;
  let cookieService: jasmine.SpyObj<CookieService>;
 
  beforeEach(async () => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [ SittingRecordsLandingComponent,  SittingRecordsLandingManageRecordsComponent ],
      providers: [
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show FindAddDeleteSittingRecordsOption and SubmitSittingRecordsOption if jps-JOH-admin role signs in', () => {
    cookieService.get.withArgs('__userrole__').and.returnValue("jps-JOH-admin");
    console.log('jps-JOH-admin Before showFindAddDeleteSittingRecordsOption: ' + component.showFindAddDeleteSittingRecordsOption);
    console.log('Before showSubmitSittingRecordsOption: ' + component.showSubmitSittingRecordsOption);
    component.ngOnInit();
    console.log('After showFindAddDeleteSittingRecordsOption: ' + component.showFindAddDeleteSittingRecordsOption);
    console.log('After showSubmitSittingRecordsOption: ' + component.showSubmitSittingRecordsOption);
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(false);
    expect(component.showSubmitSittingRecordsOption).toEqual(false);
  });

  it('should show FindAddDeleteSittingRecordsOption and SubmitSittingRecordsOption if jps-submitter role signs in', () => {
    cookieService.get.withArgs('__userrole__').and.returnValue("jps-submitter");
    console.log('jps-submitter Before showFindAddDeleteSittingRecordsOption: ' + component.showFindAddDeleteSittingRecordsOption);
    console.log('Before showSubmitSittingRecordsOption: ' + component.showSubmitSittingRecordsOption);
    component.ngOnInit();
    console.log('After showFindAddDeleteSittingRecordsOption: ' + component.showFindAddDeleteSittingRecordsOption);
    console.log('After showSubmitSittingRecordsOption: ' + component.showSubmitSittingRecordsOption);
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(true);
    expect(component.showSubmitSittingRecordsOption).toEqual(true);
  });

  it('should show only FindAddDeleteSittingRecordsOption if jps-publisher role signs in', () => {
    cookieService.get.withArgs('__userrole__').and.returnValue("jps-publisher");
    component.ngOnInit();
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(true);
    expect(component.showSubmitSittingRecordsOption).toEqual(false);
  });


  it('should show only FindAddDeleteSittingRecordsOption if jps-admin role signs in', () => {
    cookieService.get.withArgs('__userrole__').and.returnValue("jps-admin");
    component.ngOnInit();
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(true);
    expect(component.showSubmitSittingRecordsOption).toEqual(false);
  });

  it('should hide manageRecords when FindAddDeleteSittingRecordsOption is selected', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt1');

    expect(component.hideManageRecords).toEqual(true);
  });

  it('should not hide manageRecords when SubmitSittingRecordsOption is selected', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt2');

    expect(component.hideManageRecords).toEqual(false);
  });

  it('should navigate to manage-sitting-records when the form is submitted', () => {
    const options = component.userForm.controls['options'];
    options.setValue('opt1');
    spyOn(mockRouter, 'navigate');
 
    component.submitForm();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
  });
});
