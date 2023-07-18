import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationService } from '../../../_services/location-service/location.service';
import { SittingRecordsLandingManageRecordsSubmitterComponent } from './sitting-records-landing-manage-records-submitter.component';
import { RegionModel } from '../../../_models/region.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('SittingRecordsLandingManageRecordsComponent', () => {
  let component: SittingRecordsLandingManageRecordsSubmitterComponent;
  let fixture: ComponentFixture<SittingRecordsLandingManageRecordsSubmitterComponent>;
  let locationService: LocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ SittingRecordsLandingManageRecordsSubmitterComponent ],
      providers: [ LocationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingManageRecordsSubmitterComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the region field on initialization', () => {
    expect(component.manageRecords.controls['region'].disabled).toBeTrue();
  });

  it('should enable the region field when the tribunalService field is not empty', () => {
    const tribunalService = component.manageRecords.controls['tribunalService'];
    const region = component.manageRecords.controls['region'];

    tribunalService.setValue('test');
    expect(region.enabled).toBeTrue();
  });

  it('should reset the region field when the tribunalService field is changed', () => {
    const tribunalService = component.manageRecords.controls['tribunalService'];
    const region = component.manageRecords.controls['region'];

    tribunalService.setValue('test');
    region.setValue('test venue');

    tribunalService.setValue('new test');
    expect(region.value).toBeNull();
  });

  it('should call the LocationService and return regions when calling getRegions', () => {
    const regions: RegionModel[] = [
      { region_id: '1',
      description: 'Region1',
      welsh_region: '',
      },
      { region_id: '2',
      description: 'Region2',
      welsh_region: '',
      }
    ];

    spyOn(locationService, 'getAllRegions').and.returnValue(of(regions));

    component.getRegions();
    expect(locationService.getAllRegions).toHaveBeenCalled();

  });


});
