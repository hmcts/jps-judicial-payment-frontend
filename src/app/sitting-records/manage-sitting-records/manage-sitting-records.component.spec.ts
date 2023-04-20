import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageSittingRecordsComponent } from './manage-sitting-records.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';

describe('ManageSittingRecordsComponent', () => {
  let component: ManageSittingRecordsComponent;
  let fixture: ComponentFixture<ManageSittingRecordsComponent>;
  let router: Router;
  let srWorkflowService: SittingRecordWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ManageSittingRecordsComponent],
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

});

