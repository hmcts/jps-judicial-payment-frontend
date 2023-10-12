import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecorderWorkflowService } from 'src/app/_workflows/recorder-workflow.service';

@Component({
  selector: 'app-duplicate-existing-confirm',
  templateUrl: './duplicate-existing-confirm.component.html',
  styleUrls: ['./duplicate-existing-confirm.component.scss']
})
export class DuplicateExistingConfirmComponent {

  constructor(
    private router: Router,
    private recorderWorkFlow: RecorderWorkflowService
  ){}

  navigateBackToView(){
    this.recorderWorkFlow.resetAddSittingRecords()
    this.recorderWorkFlow.resetCameFromConfirm()
    void this.router.navigate(['sittingRecords', 'view'])
  }
}
