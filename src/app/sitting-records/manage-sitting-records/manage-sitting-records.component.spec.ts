import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageSittingRecordsComponent } from './manage-sitting-records.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { LocationService } from 'src/app/_services/location-service/location.service';
import { CookieService } from 'ngx-cookie-service';

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;
  let locationService: LocationService;
  let cookieService: CookieService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule, MatAutocompleteModule],
      declarations: [ManageSittingRecordsComponent],
      providers: [
        SittingRecordWorkflowService, 
        LocationService,
        CookieService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    srWorkflowService = TestBed.inject(SittingRecordWorkflowService);
    locationService = TestBed.inject(LocationService);
    cookieService = TestBed.inject(CookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the venue field on initialization', () => {
    expect(component.manageRecords.controls['venue'].disabled).toBeTrue();
  });

  it('should reset the venue field when the tribunalService field is changed', () => {
    spyOn(locationService, 'getAllVenues').and.returnValue(of([]));
    const tribunalService = component.manageRecords.controls['tribunalService'];
    const venue = component.manageRecords.controls['venue'];

    tribunalService.setValue('test');
    venue.setValue('test venue');
    expect(venue.value).toEqual('test venue');
    tribunalService.setValue('new test');
    expect(venue.value).toEqual(null);
  });

  it('should navigate to view-sitting-records when the form is submitted', () => {
    spyOn(srWorkflowService, 'setFormData');
    spyOn(srWorkflowService, 'setManageVisited');
    spyOn(router, 'navigate');
    component.submitForm();

    expect(srWorkflowService.setFormData).toHaveBeenCalled();
    expect(srWorkflowService.setManageVisited).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

  it('should populate manageRecords if object exists in sittingRecordsWorkflow', () => {
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    srWorkflowService.setFormData(formDataMock)
    component.ngOnInit();

    expect(component.manageRecords).toEqual(formDataMock)
  });



  it('should return the site name when calling showVenue with a truthy value', () => {
    const value = { site_name: 'Test Site' };
    const result = component.showVenue(value);
    expect(result).toBe('Test Site');
  });

  it('should return null when calling showVenue with a falsy value', () => {
    const value = null;
    const result = component.showVenue(value);
    expect(result).toBe('');
  })
  

    it('should return empty array if value is not a string', () => {
      const venues = [];
      component.venues = venues;
      
      const result = component['_filter']('123');

      expect(result).toEqual([]);
    });

    it('should return empty array if value length is less than minSearchCharacters', () => {
      const venues = [];
      component.venues = venues;
      
      const result = component['_filter']('te');

      expect(result).toEqual([]);
    });

    it('should filter venues where name includes search term', () => {
      const venues = {
        court_venues:[
          {
            court_venue_id: '',
            epimms_id: '',
            site_name: 'First Venue',
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
            site_name: 'Second Venue',
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
        ]
      };
      component.venues = venues.court_venues;
      
      const result = component['_filter']('first');

      expect(result.length).toBe(1);
      expect(result[0]['site_name']).toBe('First Venue');
    });

    it('should set typeaheadResultsFound to false if no results', () => {
      const venues = [];
      component.venues = venues;
      
      component['_filter']('test');

      expect(component.typeaheadResultsFound).toBe(false);
    });

    it('should go to sittingRecords/home when goBack is called', () => {
      spyOn(router, 'navigate');

      component.goBack();

      expect(router.navigate).toHaveBeenCalledWith(['sittingRecords','home']);
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

