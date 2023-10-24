import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DateService } from '../../../_services/date-service/date-service';
import { UserInfoService } from '../../../_services/user-info-service/user-info-service';
import { ManageSittingRecordsWorkflowService } from '../../../_workflows/manage-sitting-record-workflow.service';

@Component({
  selector: 'app-add-sitting-record-success',
  templateUrl: './add-sitting-record-success.component.html',
  styleUrls: ['./add-sitting-record-success.component.scss']
})
export class AddSittingRecordSuccessComponent implements OnInit {
  tribService!: string;
  venueSiteName!: string;
  date!: string;
  newSittingRecords!: FormGroup;
  recordedByName!: string;
  
  navigateBackToStart(){
    this.srWorkFlow.resetAddSittingRecords();
    this.srWorkFlow.resetCameFromConfirm();
    void this.router.navigate(['sittingRecords','view']);
  }

  get johFormArray(): FormArray {
    return this.newSittingRecords?.controls['JOH'] as FormArray;
  }

  constructor(
    private srWorkFlow: ManageSittingRecordsWorkflowService,
    private dateSvc: DateService,
    private uInfoSvc: UserInfoService,
    private router: Router,
    ){}

  ngOnInit(){
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService.service;
    this.venueSiteName = venue.site_name;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
    this.recordedByName = this.uInfoSvc.getUserName()
    this.newSittingRecords = this.srWorkFlow.getAddSittingRecords();
  }

}
