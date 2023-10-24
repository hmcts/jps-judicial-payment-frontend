import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageSittingRecordsWorkflowService } from 'src/app/_workflows/manage-sitting-record-workflow.service';

@Component({
  selector: 'app-duplicate-existing-confirm',
  templateUrl: './duplicate-existing-confirm.component.html',
  styleUrls: ['./duplicate-existing-confirm.component.scss']
})
export class DuplicateExistingConfirmComponent {

  constructor(
    private router: Router,
    private recorderWorkFlow: ManageSittingRecordsWorkflowService
  ){}

  navigateBackToView(){
    this.recorderWorkFlow.resetAddSittingRecords()
    this.recorderWorkFlow.resetCameFromConfirm()
    void this.router.navigate(['sittingRecords', 'view'])
  }
}
