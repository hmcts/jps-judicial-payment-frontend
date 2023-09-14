import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDuplicateComponent } from './invalid-duplicate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConvertAddPeriodPipe, ConvertToStringPeriodPipe } from '../../../_pipes/convert-period-pipe'
import { ConvertRoleIdToString } from '../../../_pipes/convertRoleIdToString'
import { StringFromDatePipeYDM } from '../../../_pipes/string-date-pipe'
import { CapitalizeFirstLetterPipe } from '../../../_pipes/convertTableStatus'
import { SittingRecordsInfoBannerComponent } from '../../sitting-records-info-banner/sitting-records-info-banner.component'

describe('InvalidDuplicateComponent', () => {
  let component: InvalidDuplicateComponent;
  let fixture: ComponentFixture<InvalidDuplicateComponent>;
  let duplicateRecordWorkflow: DuplicateRecordWorkflowService;
  let srWorkFlow: SittingRecordWorkflowService;
  let mockformData: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidDuplicateComponent, ConvertAddPeriodPipe, ConvertToStringPeriodPipe, ConvertRoleIdToString, StringFromDatePipeYDM, CapitalizeFirstLetterPipe ],
      imports: [HttpClientTestingModule],
      providers: [SittingRecordWorkflowService, DuplicateRecordWorkflowService, SittingRecordsInfoBannerComponent]
    })
    
    srWorkFlow = TestBed.inject(SittingRecordWorkflowService);
    duplicateRecordWorkflow = TestBed.inject(DuplicateRecordWorkflowService);

    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    spyOn(srWorkFlow, 'getFormData').and.returnValue(mockformData)

    fixture = TestBed.createComponent(InvalidDuplicateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
