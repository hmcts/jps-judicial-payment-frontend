import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateService } from '../../../_services/date-service/date-service';
import { UserInfoService } from '../../../_services/user-info-service/user-info-service';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';
import { ManageSittingRecordsWorkflowService } from '../../../_workflows/manage-sitting-record-workflow.service'

@Component({
  selector: 'app-potential-duplicate',
  templateUrl: './potential-duplicate.component.html',
  styleUrls: ['./potential-duplicate.component.scss']
})
export class PotentialDuplicateComponent{
  
  @Input() potentialRecord;
  @Input() index;
  @Output() valueChange = new EventEmitter<any>();
  selectedVenue;
  selectedDate;
  currentUser; 
  duplicatePotentialFormObject;

  selectedValue: any;

  updateSelection(newValue: any){
    this.selectedValue = newValue
    this.valueChange.emit(this.selectedValue);
  }

  constructor(
    private srWorkFlow: ManageSittingRecordsWorkflowService,
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
