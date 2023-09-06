import { Component } from '@angular/core';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { Router } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import { DateService } from '../../../_services/date-service/date-service';
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
    private dateSvc: DateService,
    private uInfoSvc: UserInfoService,
    public router: Router,
  ) {
    this.newSittingRecords = this.srWorkFlow.getAddSittingRecords();
    this.recordedByName = this.uInfoSvc.getUserName()
  }

  cancelAdd(){
    void this.router.navigate(['sittingRecords', 'manage'])
    this.srWorkFlow.resetCameFromConfirm()
    this.srWorkFlow.resetAddSittingRecords()
  }

  goBack(){
    this.srWorkFlow.setCameFromConfirm();
    void this.router.navigate(['sittingRecords', 'add'])
  }

  get johFormArray(): FormArray {
    return this.newSittingRecords?.controls['JOH'] as FormArray;
  }

  submitNewRecords(){
    this.srWorkFlow.formAndPostNewSittingRecord().subscribe(
      () => {
        void this.router.navigate(['sittingRecords', 'addSuccess'])

      }
    )
  }

}
