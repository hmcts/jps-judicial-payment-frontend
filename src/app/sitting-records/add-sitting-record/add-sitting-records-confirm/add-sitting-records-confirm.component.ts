import { Component } from '@angular/core';
import { RecorderWorkflowService } from '../../../_workflows/recorder-workflow.service';
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
    public recorderWorkFlow: RecorderWorkflowService,
    public drWorkFlow: DuplicateRecordWorkflowService,
    private uInfoSvc: UserInfoService,
    public router: Router,
  ) {
    this.newSittingRecords = this.recorderWorkFlow.getAddSittingRecords();
    this.recordedByName = this.uInfoSvc.getUserName()
  }

  cancelAdd(){
    void this.router.navigate(['sittingRecords', 'manage'])
    this.recorderWorkFlow.resetCameFromConfirm()
    this.recorderWorkFlow.resetAddSittingRecords()
  }

  goBack(){
    this.recorderWorkFlow.setCameFromConfirm();
    void this.router.navigate(['sittingRecords', 'add'])
  }

  get johFormArray(): FormArray {
    return this.newSittingRecords?.controls['JOH'] as FormArray;
  }

  submitNewRecords(){
    this.recorderWorkFlow.formAndPostNewSittingRecord()
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
