import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateService } from '../../../_services/date-service/date-service';
import { UserInfoService } from '../../../_services/user-info-service/user-info-service';
import { RecorderWorkflowService } from '../../../_workflows/recorder-workflow.service';

@Component({
  selector: 'app-potential-duplicate',
  templateUrl: './potential-duplicate.component.html',
  styleUrls: ['./potential-duplicate.component.scss']
})
export class PotentialDuplicateComponent{
  
  @Input() potentialRecord;
  @Input() index;
  @Output() valueChange = new EventEmitter<boolean>();
  selectedVenue;
  selectedDate;
  currentUser; 
  duplicatePotentialFormObject;

  selectedValue?: boolean;

  updateSelection(newValue: boolean){
    this.selectedValue = newValue
    this.valueChange.emit(this.selectedValue);
  }

  constructor(
    private recorderWorkFlow: RecorderWorkflowService,
    private dateSvc: DateService,
    private uInfoSvc: UserInfoService,
  ){
    const formData = this.recorderWorkFlow.getFormData().value;
    const { dateSelected, venue } = formData;
    this.selectedVenue = venue.site_name;
    this.selectedDate = this.dateSvc.formatDateFromForm(dateSelected);
    this.currentUser = this.uInfoSvc.getUserName()
  }

}
