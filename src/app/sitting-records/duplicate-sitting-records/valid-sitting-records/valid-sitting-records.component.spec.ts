import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidSittingRecordsComponent } from './valid-sitting-records.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';
import { ManageSittingRecordsWorkflowService } from 'src/app/_workflows/manage-sitting-record-workflow.service';
import { ConvertAddPeriodPipe, ConvertToStringPeriodPipe } from './../../../_pipes/convert-period-pipe'
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConvertRoleIdToString } from './../../../_pipes/convertRoleIdToString'
import { StringFromDatePipeYDM, StringFromDatePipe } from '../../../_pipes/string-date-pipe'

describe('ValidSittingRecordsComponent', () => {
  let component: ValidSittingRecordsComponent;
  let fixture: ComponentFixture<ValidSittingRecordsComponent>;
  let duplicateRecordWorkflow: DuplicateRecordWorkflowService;
  let srWorkFlow: ManageSittingRecordsWorkflowService;
  let mockformData: FormGroup;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidSittingRecordsComponent, ConvertAddPeriodPipe, ConvertToStringPeriodPipe, ConvertRoleIdToString, StringFromDatePipeYDM, StringFromDatePipe ],
      imports: [HttpClientTestingModule],
      providers: [ManageSittingRecordsWorkflowService, DuplicateRecordWorkflowService]
    })
    .compileComponents();
    srWorkFlow = TestBed.inject(ManageSittingRecordsWorkflowService);
    duplicateRecordWorkflow = TestBed.inject(DuplicateRecordWorkflowService);

    
    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    spyOn(srWorkFlow, 'getFormData').and.returnValue(mockformData)
    spyOn(duplicateRecordWorkflow, 'matchValidRecords').and.returnValue([{}, {}]);

    fixture = TestBed.createComponent(ValidSittingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter records to find matching records using filterRecords() and set validRecords', () => {

    spyOn(component, 'filterRecords')
    
    component.ngOnInit();

    expect(component.validRecords).toEqual([{}, {}])

  })
});
