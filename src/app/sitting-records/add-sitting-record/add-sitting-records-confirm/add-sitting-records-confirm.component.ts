import { Component } from '@angular/core';
import { ManageSittingRecordsWorkflowService } from '../../../_workflows/manage-sitting-record-workflow.service';
import { Router } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
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
    public mmsrWorkFlow: ManageSittingRecordsWorkflowService,
    public drWorkFlow: DuplicateRecordWorkflowService,
    private uInfoSvc: UserInfoService,
    public router: Router,
  ) {
    this.newSittingRecords = this.mmsrWorkFlow.getAddSittingRecords();
    this.recordedByName = this.uInfoSvc.getUserName()
  }

  cancelAdd(){
    void this.router.navigate(['sittingRecords', 'manage'])
    this.mmsrWorkFlow.resetCameFromConfirm()
    this.mmsrWorkFlow.resetAddSittingRecords()
  }

  goBack(){
    this.mmsrWorkFlow.setCameFromConfirm();
    void this.router.navigate(['sittingRecords', 'add'])
  }

  get johFormArray(): FormArray {
    return this.newSittingRecords?.controls['JOH'] as FormArray;
  }

  submitNewRecords(){
    this.mmsrWorkFlow.formAndPostNewSittingRecord()
    .subscribe({
      next: () => {
        void this.router.navigate(['sittingRecords', 'addSuccess']);
      },
      error: (error) => {
        const errorRecords = error.error['message'];
        this.drWorkFlow.setErrorRecords(errorRecords);
          void this.router.navigate(['sittingRecords', 'addDuplicates']);
      }
    });
  }

}
