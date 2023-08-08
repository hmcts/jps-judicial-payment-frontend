import { Component } from '@angular/core';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { Router } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import { DateService } from '../../../_services/date-service/date-service';
import { DuplicateRecordWorkflowService } from '../../../_workflows/duplicate-record-workflow.service'
import { UserInfoService } from '../../../_services/user-info-service/user-info-service';

@Component({
  selector: 'app-add-sitting-records-confirm',
  templateUrl: './add-sitting-records-confirm.component.html',
  styleUrls: ['./add-sitting-records-confirm.component.scss']
})
export class AddSittingRecordsConfirmComponent{

  newSittingRecords!: FormGroup;
  recordedByName;

  constructor(
    public srWorkFlow: SittingRecordWorkflowService,
    public drWorkFlow: DuplicateRecordWorkflowService,
    private dateSvc: DateService,
    private uInfoSvc: UserInfoService,
    public router: Router,
  ) {
    this.newSittingRecords = this.srWorkFlow.getAddSittingRecords();
    this.recordedByName = this.uInfoSvc.getUserName()
  }

  cancelAdd(){
    this.srWorkFlow.resetCameFromConfirm()
    this.srWorkFlow.resetAddSittingRecords()
    void this.router.navigate(['sittingRecords', 'manage'])
  }

  goBack(){
    this.srWorkFlow.setCameFromConfirm();
    void this.router.navigate(['sittingRecords', 'add'])
  }

  get johFormArray(): FormArray {
    return this.newSittingRecords?.controls['JOH'] as FormArray;
  }

  submitNewRecords(){
    this.srWorkFlow.formAndPostNewSittingRecord()
    .subscribe((response) => {
      const errorRecords = response['errorRecords']
      if(response['message'] === 'success' || errorRecords.length === 0){
        void this.router.navigate(['sittingRecords', 'addSuccess'])
      }else{
        this.drWorkFlow.setErrorRecords(errorRecords)
        void this.router.navigate(['sittingRecords', 'addDuplicates'])
      }
    })
  }

  convertPeriod(period: string): string {
    return this.dateSvc.convertPeriod(period);
  }

}
