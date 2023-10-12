import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialDuplicateComponent } from './potential-duplicate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';
import { RecorderWorkflowService } from '../../../_workflows/recorder-workflow.service';
import { ConvertAddPeriodPipe, ConvertToStringPeriodPipe } from './../../../_pipes/convert-period-pipe'
import { ConvertRoleIdToString } from './../../../_pipes/convertRoleIdToString'
import { SittingRecordsInfoBannerComponent } from '../../sitting-records-info-banner/sitting-records-info-banner.component'
import { StringFromDatePipeYDM } from '../../../_pipes/string-date-pipe'
import { CapitalizeFirstLetterPipe } from '../../../_pipes/convertTableStatus'

describe('PotentialDuplicateComponent', () => {
  let component: PotentialDuplicateComponent;
  let fixture: ComponentFixture<PotentialDuplicateComponent>;
  let duplicateRecordWorkflow: DuplicateRecordWorkflowService;
  let srWorkFlow: RecorderWorkflowService;
  let mockformData: FormGroup;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialDuplicateComponent, ConvertAddPeriodPipe, ConvertToStringPeriodPipe, ConvertRoleIdToString, StringFromDatePipeYDM, CapitalizeFirstLetterPipe],
      imports: [HttpClientTestingModule],
      providers: [RecorderWorkflowService, DuplicateRecordWorkflowService, SittingRecordsInfoBannerComponent]
    })

    srWorkFlow = TestBed.inject(RecorderWorkflowService);
    duplicateRecordWorkflow = TestBed.inject(DuplicateRecordWorkflowService);

    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    spyOn(srWorkFlow, 'getFormData').and.returnValue(mockformData)

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
