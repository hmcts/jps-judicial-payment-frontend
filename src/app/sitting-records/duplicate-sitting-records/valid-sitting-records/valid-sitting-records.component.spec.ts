import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidSittingRecordsComponent } from './valid-sitting-records.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';
import { SittingRecordWorkflowService } from 'src/app/_workflows/sitting-record-workflow.service';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('ValidSittingRecordsComponent', () => {
  let component: ValidSittingRecordsComponent;
  let fixture: ComponentFixture<ValidSittingRecordsComponent>;
  let duplicateRecordWorkflow: DuplicateRecordWorkflowService;
  let srWorkFlow: SittingRecordWorkflowService;
  let mockformData: FormGroup;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidSittingRecordsComponent ],
      imports: [HttpClientTestingModule],
      providers: [SittingRecordWorkflowService, DuplicateRecordWorkflowService]
    })
    .compileComponents();
    srWorkFlow = TestBed.inject(SittingRecordWorkflowService);
    duplicateRecordWorkflow = TestBed.inject(DuplicateRecordWorkflowService);

    
    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    spyOn(srWorkFlow, 'getFormData').and.returnValue(mockformData)
    spyOn(duplicateRecordWorkflow, 'matchDuplicateRecords').and.returnValue([{}, {}]);

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
