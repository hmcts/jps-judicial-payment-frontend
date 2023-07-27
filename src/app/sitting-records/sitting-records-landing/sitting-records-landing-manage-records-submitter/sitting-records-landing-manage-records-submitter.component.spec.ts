import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationService } from '../../../_services/location-service/location.service';
import { SittingRecordsLandingManageRecordsSubmitterComponent } from './sitting-records-landing-manage-records-submitter.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubmitterWorkflowService } from '../../../_workflows/submitter-workflow.service';
import { TribunalServiceComponent } from '../../shared-components/tribunal-service/tribunal-service.component';
import { RegionComponent } from '../../shared-components/region/region.component';
import { SittingDateComponent } from '../../shared-components/sitting-date/sitting-date.component';

describe('SittingRecordsLandingManageRecordsSubmitterComponent', () => {
  let component: SittingRecordsLandingManageRecordsSubmitterComponent;
  let fixture: ComponentFixture<SittingRecordsLandingManageRecordsSubmitterComponent>;
  let submitterWorkflowService: SubmitterWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ SittingRecordsLandingManageRecordsSubmitterComponent, TribunalServiceComponent, RegionComponent, SittingDateComponent ],
      providers: [ LocationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingManageRecordsSubmitterComponent);
    component = fixture.componentInstance;
    submitterWorkflowService = TestBed.inject(SubmitterWorkflowService);
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

  it('should return formData onInit', () => {
    const mockFormData: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      region: ['Region 1'],
    });

    spyOn(submitterWorkflowService, 'getFormData').and.returnValue(mockFormData);
    component.ngOnInit();
    expect(submitterWorkflowService.getFormData()).toEqual(mockFormData);

  });

});
