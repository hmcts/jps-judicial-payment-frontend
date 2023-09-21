import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../../_services/user-info-service/user-info-service';
import { DuplicateRecordWorkflowService } from 'src/app/_workflows/duplicate-record-workflow.service';

@Component({
  selector: 'app-duplicate-confirm',
  templateUrl: './duplicate-confirm.component.html',
  styleUrls: ['./duplicate-confirm.component.scss']
})
export class DuplicateConfirmComponent implements OnInit{

  confirmationRecords;
  currentUser;

  constructor(
    private router: Router,
    private drWorkFlow: DuplicateRecordWorkflowService,
    private uInfoSvc: UserInfoService,
  ){}

  ngOnInit(){
    this.confirmationRecords = this.drWorkFlow.getResolvedDuplicateSelections();
    this.currentUser = this.uInfoSvc.getUserName()
  }

  goBack(){
    void this.router.navigate(['sittingRecords', 'addDuplicates'])
  }

  cancelConfirm(){
    void this.router.navigate(['sittingRecords', 'view'])
  }

  submitRecords() {
    this.drWorkFlow.setValidResolvedRecords(this.confirmationRecords.submitting)
    this.drWorkFlow.postResolvedDuplicates(this.confirmationRecords.submitting)
      .subscribe((response) => {
        const errorRecords = response['errorRecords']
        if (!response['message'] || response === 'No_Records') {
          void this.router.navigate(['sittingRecords', 'confirmDupeSuccess'])
        } else {
          this.drWorkFlow.setErrorRecords(errorRecords)
          void this.router.navigate(['sittingRecords', 'addDuplicates'])
        }
      })
  }

}
