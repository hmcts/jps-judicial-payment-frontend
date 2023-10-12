import { Component, Input } from '@angular/core';
import { RecorderWorkflowService } from '../../../_workflows/recorder-workflow.service';
import { DateService } from '../../../_services/date-service/date-service';
import { UserInfoService } from 'src/app/_services/user-info-service/user-info-service';

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
