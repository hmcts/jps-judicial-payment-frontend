import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDuplicateComponent } from './invalid-duplicate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('InvalidDuplicateComponent', () => {
  let component: InvalidDuplicateComponent;
  let fixture: ComponentFixture<InvalidDuplicateComponent>;
  let duplicateRecordWorkflow: DuplicateRecordWorkflowService;
  let srWorkFlow: SittingRecordWorkflowService;
  let mockformData: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidDuplicateComponent ],
      imports: [HttpClientTestingModule],
      providers: [SittingRecordWorkflowService, DuplicateRecordWorkflowService]
    })
    
    srWorkFlow = TestBed.inject(SittingRecordWorkflowService);
    duplicateRecordWorkflow = TestBed.inject(DuplicateRecordWorkflowService);

    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    spyOn(srWorkFlow, 'getFormData').and.returnValue(mockformData)
    spyOn(duplicateRecordWorkflow, 'matchDuplicateRecord').and.returnValue({});

    fixture = TestBed.createComponent(InvalidDuplicateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
