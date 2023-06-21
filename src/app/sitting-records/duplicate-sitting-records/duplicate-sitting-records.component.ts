import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DuplicateRecordWorkflowService } from '../../_workflows/duplicate-record-workflow.service'
@Component({
  selector: 'app-duplicate-sitting-records',
  templateUrl: './duplicate-sitting-records.component.html',
  styleUrls: ['./duplicate-sitting-records.component.scss']
})
export class DuplicateSittingRecordsComponent implements OnInit {


  recordsWithErrors;

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    public drWorkFlow: DuplicateRecordWorkflowService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recordsWithErrors = this.drWorkFlow.getErrorRecords();
    console.log(this.drWorkFlow.getErrorRecords())
  }

  updateReplaceDuplicate($event: boolean, index: number) {
    console.log($event, index)
  }

  navigateToPreviousPage() {
    void this.router.navigate(['../addConfirm'])
  }

  cancelCurrentFlow() {
    void this.router.navigate(['../manage'])
  }

  resubmitSittingRecords() {
    void this.router.navigate(['../addSuccess'])
  }

}
