import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDuplicateComponent } from './potential-duplicate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';

describe('PotentialDuplicateComponent', () => {
  let component: PotentialDuplicateComponent;
  let fixture: ComponentFixture<PotentialDuplicateComponent>;
  let duplicateRecordWorkflow: DuplicateRecordWorkflowService;
  let srWorkFlow: SittingRecordWorkflowService;
  let mockformData: FormGroup;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialDuplicateComponent ],
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

    fixture = TestBed.createComponent(PotentialDuplicateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value change when updateSelection() is called', () => {
    spyOn(component.valueChange, 'emit');

    component.updateSelection(true);

    expect(component.valueChange.emit).toHaveBeenCalledWith(true);
  })

});
