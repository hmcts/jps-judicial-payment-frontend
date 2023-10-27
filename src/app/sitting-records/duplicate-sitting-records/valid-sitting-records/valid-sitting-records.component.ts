import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../../_services/date-service/date-service';
import { RecorderWorkflowService } from '../../../_workflows/recorder-workflow.service';
import { UserInfoService } from '../../../_services/user-info-service/user-info-service';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service';

@Component({
  selector: 'app-valid-sitting-records',
  templateUrl: './valid-sitting-records.component.html',
  styleUrls: ['./valid-sitting-records.component.scss']
})
export class ValidSittingRecordsComponent implements OnInit {

  @Input() recordData;
  validRecords: any[] | undefined;
  selectedVenue
  selectedDate
  currentUser
  tableHeaderText

  constructor(
    private recorderWorkFlow: RecorderWorkflowService,
    private dateSvc: DateService,
    private dupeRecordWorkflow: DuplicateRecordWorkflowService,
    private uInfoSvc: UserInfoService,
  ){
    const formData = this.recorderWorkFlow.getFormData().value;
    const { dateSelected, venue } = formData;
    this.selectedVenue = venue.court_name;
    this.selectedDate = this.dateSvc.formatDateFromForm(dateSelected);
    this.currentUser = this.uInfoSvc.getUserName()

  }

  filterRecords() {
      this.validRecords = this.dupeRecordWorkflow.matchValidRecords(this.recordData, this.recorderWorkFlow.getAddSittingRecords());
  }

  ngOnInit(){
    this.filterRecords();
    this.tableHeaderText = this.dupeRecordWorkflow.getValidRecordsTableCaption()
  }
}
