import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageSittingRecordsWorkflowService} from 'src/app/_workflows/manage-sitting-record-workflow.service'

@Component({
  selector: 'app-duplicate-existing-confirm',
  templateUrl: './duplicate-existing-confirm.component.html',
  styleUrls: ['./duplicate-existing-confirm.component.scss']
})
export class DuplicateExistingConfirmComponent {

  constructor(
    private router: Router,
    private srWorkFlow: ManageSittingRecordsWorkflowService
  ){}

  navigateBackToView(){
    this.srWorkFlow.resetAddSittingRecords()
    this.srWorkFlow.resetCameFromConfirm()
    void this.router.navigate(['sittingRecords', 'view'])
  }
}
