import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationService } from '../../../_services/location-service/location.service';
import { VenueModel } from '../../../_models/venue.model';
import { VenueComponent } from './venue.component';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('VenueComponent', () => {
  let component: VenueComponent;
  let fixture: ComponentFixture<VenueComponent>;
  let locationService: LocationService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, MatAutocompleteModule ],
      declarations: [ VenueComponent ],
      providers: [ LocationService, FormGroupDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService);

    component.parentFormGroup.form = new FormBuilder().group({
      venue: ['Venue 1'],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    expect(component.parentFormGroup.control.controls['venue'].value).toEqual(venue);
    expect(component.parentFormGroup.control.controls['venue'].untouched).toBeTrue();
  });

  it('should call the LocationService and return venues when calling getVenues', () => {
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

    spyOn(locationService, 'getAllVenues').and.returnValue(of(venues));

    component.getVenues(searchTerm).subscribe((result) => {
      expect(result).toEqual(venues);
    });
  });
});
