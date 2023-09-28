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

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let recorderWorkFlowService: RecorderWorkflowService;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let locationService: LocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatAutocompleteModule],
      declarations: [ManageSittingRecordsComponent],
      providers: [
        RecorderWorkflowService, 
        LocationService,
        CookieService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    recorderWorkFlowService = TestBed.inject(RecorderWorkflowService);
    mockCookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    locationService = TestBed.inject(LocationService);
    spyOn(locationService, 'getAllVenues').and.returnValue(of([]))
    fixture.detectChanges();
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

  it('should go to sittingRecords/home when goBack is called', () => {
    spyOn(router, 'navigate');

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
  });

  it('should not show the previous button for user role "jps-recorder"', () => {
    spyOn(mockCookieService, 'get').and.returnValue('jps-recorder');

    recorderWorkFlowService.setFormData(formDataMock)
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

  it('should filter venues based on input value', () => {
    component.venues = [
      { 
        court_venue_id: '',
        epimms_id: '',
        site_name: 'Venue1',
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
        welsh_site_name :  '',
        welsh_court_address :  '',
        court_status :  '',
        court_open_date :  '',
        court_name :  '',
        venue_name :  '',
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
      },
      { 
        court_venue_id: '',
        epimms_id: '',
        site_name: 'Venue2',
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
        welsh_site_name :  '',
        welsh_court_address :  '',
        court_status :  '',
        court_open_date :  '',
        court_name :  '',
        venue_name :  '',
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
      },
      { 
        court_venue_id: '',
        epimms_id: '',
        site_name: 'Venue3',
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
        welsh_site_name :  '',
        welsh_court_address :  '',
        court_status :  '',
        court_open_date :  '',
        court_name :  '',
        venue_name :  '',
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
    let result = component['_filter']('Venue1');
    expect(result.length).toBe(1);
    expect(result[0]['site_name']).toBe('Venue1');
  
    result = component['_filter']('Venue');
    expect(result.length).toBe(3);
  
    result = component['_filter']('NonExistingVenue');
    expect(result.length).toBe(0);
  });

})

