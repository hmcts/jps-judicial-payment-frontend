import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SittingRecordsLandingComponent } from './sitting-records-landing.component';
import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing-manage-records/sitting-records-landing-manage-records.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SittingRecordsLandingComponent', () => {
  let component: SittingRecordsLandingComponent;
  let fixture: ComponentFixture<SittingRecordsLandingComponent>;
  let mockRouter: Router;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ SittingRecordsLandingComponent,  SittingRecordsLandingManageRecordsComponent ],
      providers: [
        { provide: CookieService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show FindAddDeleteSittingRecordsOption and SubmitSittingRecordsOption if jps-JOH-admin role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-JOH-admin');
    component.ngOnInit();
    expect(component.showFindAddDeleteSittingRecordsOption).toEqual(false);
    expect(component.showSubmitSittingRecordsOption).toEqual(false);
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

  it('should show only FindAddDeleteSittingRecordsOption if jps-admin role signs in', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-admin');
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
