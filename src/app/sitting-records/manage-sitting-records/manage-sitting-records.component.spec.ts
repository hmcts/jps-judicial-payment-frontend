import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageSittingRecordsComponent } from './manage-sitting-records.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { VenueService } from '../../_services/venue-service/venue.service';
import { VenueModel } from '../../_models/venue.model';

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;
  let venueService: VenueService;
  let venueValueChange: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
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

    component.submitForm();

    expect(srWorkflowService.setFormData).toHaveBeenCalled();
    expect(srWorkflowService.setManageVisited).toHaveBeenCalled();
    expect(venueValueChange.unsubscribe).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });

  it('should return venues with venuesSearch()', () => {
    const venue = component.manageRecords.controls['venue'];
    venue.setValue('tes');

    component.venuesSearch();

    expect(venue.valueChanges).toHaveBeenCalled();
    expect(component.getVenues).toHaveBeenCalled();
  });

  it('should return venues with getVenues()', () => {
    const searchTerm = 'aaa';
    spyOn(venueService, 'getAllVenues');

    component.getVenues(searchTerm);

    expect(venueService.getAllVenues).toHaveBeenCalled();
  });

  it('should set the value of venue dropdown with onSelectionChange()', () => {
    const venueModel: VenueModel = {
      site_name: 'Tribunal',
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
    const venue = component.manageRecords.controls['venue'];

    component.onSelectionChange(venueModel);

    expect(venue.value).toEqual(venueModel.site_name);
  });

  it('should assign site_name to control with showVenue()', () => {
    const value: VenueModel = {
      site_name: 'Tribunal',
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

    expect(component.showVenue(value)).toEqual(value.site_name);
  });

});

