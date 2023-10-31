import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageSittingRecordsComponent } from './manage-sitting-records.component';
import { RecorderWorkflowService } from '../../_workflows/recorder-workflow.service';
import { LocationService } from '../../_services/location-service/location.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VenueModel } from 'src/app/_models/venue.model';
import { VenueComponent } from '../shared-components/venue/venue.component';
import { TribunalServiceComponent } from '../shared-components/tribunal-service/tribunal-service.component';
import { SittingDateComponent } from '../shared-components/sitting-date/sitting-date.component';

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let recorderWorkFlowService: RecorderWorkflowService;
  let locationService: LocationService;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatAutocompleteModule,],
      declarations: [
        ManageSittingRecordsComponent,
        VenueComponent,
        TribunalServiceComponent,
        SittingDateComponent
      ],
      providers: [
        RecorderWorkflowService,
        LocationService,
        CookieService,

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    recorderWorkFlowService = TestBed.inject(RecorderWorkflowService);
    locationService = TestBed.inject(LocationService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the venue field on initialization', () => {
    component.manageRecords = new FormBuilder().group({
      dateSelected: [null],
      tribunalService: [null],
      venue: [null],
    });
    component.createEventListeners()
    expect(component.manageRecords.controls['venue'].disabled).toBeTrue();
  });

  it('should reset the venue field when the tribunalService field is changed', () => {
    spyOn(locationService, 'getAllVenues').and.returnValue(of([]));
    const tribunalService = component.manageRecords.controls['tribunalService'];
    const venue = component.manageRecords.controls['venue'];
    component.createEventListeners();
    tribunalService.setValue('test');
    venue.setValue('test venue');
    expect(venue.value).toEqual('test venue');
    tribunalService.setValue('new test');
    expect(venue.value).toEqual(null);
  });

  it('should navigate to view-sitting-records when the form is submitted', () => {
    spyOn(recorderWorkFlowService, 'setFormData');
    spyOn(recorderWorkFlowService, 'setManageVisited');
    spyOn(router, 'navigate');
    component.submitForm();

    expect(recorderWorkFlowService.setFormData).toHaveBeenCalled();
    expect(recorderWorkFlowService.setManageVisited).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

  it('should populate manageRecords if object exists in recorderWorkFlowService', () => {
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    recorderWorkFlowService.setFormData(formDataMock)
    component.ngOnInit();

    expect(component.manageRecords).toEqual(formDataMock)
  });

  it('should populate venues if object exists in recorderWorkFlowService', () => {
    const venueMock: VenueModel[] = [
      {
        court_venue_id: '',
        epimms_id: '',
        site_name: '',
        region_id: '',
        region: '',
        court_type: '',
        court_type_id: '',
        cluster_id: '',
        cluster_name: '',
        open_for_public: '',
        court_address: '',
        postcode: '',
        phone_number: '',
        closed_date: '',
        court_location_code: '',
        dx_address: '',
        welsh_site_name: '',
        welsh_court_address: '',
        court_status: '',
        court_open_date: '',
        court_name: '',
        venue_name: '',
        is_case_management_location: '',
        is_hearing_location: '',
        welsh_venue_name: '',
        is_temporary_location: '',
        is_nightingale_court: '',
        location_type: '',
        parent_location: '',
        welsh_court_name: '',
        uprn: '',
        venue_ou_code: '',
        mrd_building_location_id: '',
        mrd_venue_id: '',
        service_url: '',
        fact_url: ''
      }
    ];

    recorderWorkFlowService.setVenueData(venueMock)
    component.ngOnInit();

    expect(component.venues).toEqual(venueMock)
  });



  it('should return the site name when calling showVenue with a truthy value', () => {
    const value = { court_name: 'Test Site' };
    const result = component.showVenue(value);
    expect(result).toBe('Test Site');
  });

  it('should return null when calling showVenue with a falsy value', () => {
    const value = null;
    const result = component.showVenue(value);
    expect(result).toBe('');
  })


  it('should go to sittingRecords/home when goBack is called', () => {
    spyOn(router, 'navigate');

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
  });

  it('should not show the previous button for user role "jps-recorder"', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-recorder');

    component.ngOnInit();

    expect(component.showPreviousButton).toBeFalse();
  });

  it('should return the controls of manageRecords', () => {
    component.manageRecords = new FormGroup({
      'tribunalService': new FormControl(''),
      'control2': new FormControl('')
    });

    const controls: { [key: string]: AbstractControl } = component.f;

    expect(controls).toBeTruthy();
    expect(controls['tribunalService']).toBeDefined();
    expect(controls['control2']).toBeDefined();
  });

})