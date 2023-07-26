import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageSittingRecordsComponent } from './manage-sitting-records.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { HttpClientModule } from '@angular/common/http'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TribunalServiceComponent } from '../shared-components/tribunal-service/tribunal-service.component';
import { SittingDateComponent } from '../shared-components/sitting-date/sitting-date.component';
import { VenueComponent } from '../shared-components/venue/venue.component';

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule, MatAutocompleteModule],
      declarations: [ManageSittingRecordsComponent, TribunalServiceComponent, SittingDateComponent, VenueComponent],
      providers: [SittingRecordWorkflowService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    srWorkflowService = TestBed.inject(SittingRecordWorkflowService);
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
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'view']);
  });
  
});
