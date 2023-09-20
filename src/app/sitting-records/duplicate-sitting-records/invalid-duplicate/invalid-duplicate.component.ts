import { Component, Input, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../../_services/date-service/date-service';
import { UserInfoService } from 'src/app/_services/user-info-service/user-info-service';
import { DuplicateRecordWorkflowService } from 'src/app/_workflows/duplicate-record-workflow.service';

@Component({
  selector: 'app-invalid-duplicate',
  templateUrl: './invalid-duplicate.component.html',
  styleUrls: ['./invalid-duplicate.component.scss']
})
export class InvalidDuplicateComponent {

  @Input() invalidRecord;
  selectedVenue;
  selectedDate;
  currentUser; 
  duplicateInvalidFormObject;

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private uInfoSvc: UserInfoService,
    private dupeRecordWorkflow: DuplicateRecordWorkflowService
  ){
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, venue } = formData;
    this.selectedVenue = venue.site_name;
    this.selectedDate = this.dateSvc.formatDateFromForm(dateSelected);
    this.currentUser = this.uInfoSvc.getUserName()
  }

}