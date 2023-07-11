import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageSittingRecordsComponent } from './manage-sitting-records.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { VenueService } from '../../_services/venue-service/venue.service';
import { VenueModel } from '../../_models/venue.model';
import { HttpClientModule } from '@angular/common/http'; 
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;
  let venueService: VenueService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule, MatAutocompleteModule],
      declarations: [ManageSittingRecordsComponent],
      providers: [SittingRecordWorkflowService, VenueService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    srWorkflowService = TestBed.inject(SittingRecordWorkflowService);
    venueService = TestBed.inject(VenueService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the venue field on initialization', () => {
    expect(component.manageRecords.controls['venue'].disabled).toBeTrue();
  });

  it('should enable the venue field when the tribunalService field is not empty', () => {
    const tribunalService = component.manageRecords.controls['tribunalService'];
    const venue = component.manageRecords.controls['venue'];

    tribunalService.setValue('test');
    expect(venue.enabled).toBeTrue();
  });

  it('should reset the venue field when the tribunalService field is changed', () => {
    const tribunalService = component.manageRecords.controls['tribunalService'];
    const venue = component.manageRecords.controls['venue'];

    tribunalService.setValue('test');
    venue.setValue('test venue');

    tribunalService.setValue('new test');
    expect(venue.value).toBeNull();
  });

  it('should navigate to view-sitting-records when the form is submitted', () => {
    spyOn(srWorkflowService, 'setFormData');
    spyOn(srWorkflowService, 'setManageVisited');
    spyOn(router, 'navigate');
    spyOn(component.venueValueChange, 'unsubscribe')

    component.venueValueChange = component.manageRecords.valueChanges.subscribe()
    component.submitForm();

    expect(srWorkflowService.setFormData).toHaveBeenCalled();
    expect(srWorkflowService.setManageVisited).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

  it('should return the site name when calling showVenue with a truthy value', () => {
    const value = { site_name: 'Test Site' };
    const result = component.showVenue(value);
    expect(result).toBe('Test Site');
  });

  it('should return an empty string when calling showVenue with a falsy value', () => {
    const result = component.showVenue(null);
    expect(result).toBe('');
  });

  it('should patch the venue value without emitting an event or affecting other controls when calling optionSelected', () => {
    const venue: VenueModel = {
      site_name: 'Test Site',
      court_venue_id: '',
      epimms_id: '',
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
    };
    const event: MatAutocompleteSelectedEvent = {
      option: {
        value: venue
      }
    } as MatAutocompleteSelectedEvent;
    component.optionSelected(event);
    expect(component.manageRecords.controls['venue'].value).toEqual(venue);
    expect(component.manageRecords.controls['venue'].untouched).toBeTrue();
  });

  it('should call the venueService and return venues when calling getVenues', () => {
    const searchTerm = 'test';
    const venues: VenueModel[] = [
      { site_name: 'Venue 1',
      court_venue_id: '',
      epimms_id: '',
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
      fact_url: '' }, 
      { site_name: 'Venue 2',
      court_venue_id: '',
      epimms_id: '',
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
      fact_url: '' }
    ];

    spyOn(venueService, 'getAllVenues').and.returnValue(of(venues));

    component.getVenues(searchTerm).subscribe((result) => {
      expect(result).toEqual(venues);
    });
  });
});
