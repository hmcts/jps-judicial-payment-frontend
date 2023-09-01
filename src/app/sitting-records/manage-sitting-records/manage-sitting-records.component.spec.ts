import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageSittingRecordsComponent } from './manage-sitting-records.component';
import { ManageSittingRecordsWorkflowService } from '../../_workflows/manage-sitting-record-workflow.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TribunalServiceComponent } from '../shared-components/tribunal-service/tribunal-service.component';
import { SittingDateComponent } from '../shared-components/sitting-date/sitting-date.component';
import { VenueComponent } from '../shared-components/venue/venue.component';
import { LocationService } from '../../_services/location-service/location.service';
import { of } from 'rxjs';

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let msrWorkFlowService: ManageSittingRecordsWorkflowService;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let locationService: LocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule, MatAutocompleteModule],
      providers: [ManageSittingRecordsWorkflowService, LocationService],
      declarations: [ManageSittingRecordsComponent, TribunalServiceComponent, SittingDateComponent, VenueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    msrWorkFlowService = TestBed.inject(ManageSittingRecordsWorkflowService);
    mockCookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    locationService = TestBed.inject(LocationService);
    spyOn(locationService, 'getAllVenues').and.returnValue(of([]))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the venue field on initialization', () => {
    expect(component.manageRecords.controls['venue'].disabled).toBeTrue();
  });

  it('should reset the venue field when the tribunalService field is changed', () => {
    const tribunalService = component.manageRecords.controls['tribunalService'];
    const venue = component.manageRecords.controls['venue'];

    tribunalService.setValue('test');
    venue.setValue('test venue');
    expect(venue.value).toEqual('test venue');
    tribunalService.setValue('new test');
    expect(venue.value).toEqual(null);
  });

  it('should navigate to view-sitting-records when the form is submitted', () => {
    spyOn(msrWorkFlowService, 'setFormData');
    spyOn(msrWorkFlowService, 'setManageVisited');
    spyOn(router, 'navigate');
    component.submitForm();

    expect(msrWorkFlowService.setFormData).toHaveBeenCalled();
    expect(msrWorkFlowService.setManageVisited).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

  it('should go to sittingRecords/home when goBack is called', () => {
    spyOn(router, 'navigate');

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
  });

  it('should not show the previous button for user role "jps-recorder"', () => {
    spyOn(mockCookieService, 'get').and.returnValue('jps-recorder');

    component.ngOnInit();

    expect(component.showPreviousButton).toBeFalse();
  });

  it('should return the controls of manageRecords', () => {
    component.manageRecords = new FormGroup({
      'tribunalService': new FormControl(''),
      'venue': new FormControl('')
    });

    const controls: { [key: string]: AbstractControl } = component.f;

    expect(controls).toBeTruthy();
    expect(controls['tribunalService']).toBeDefined();
    expect(controls['venue']).toBeDefined();
  });

})

