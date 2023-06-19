import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../../_services/date-service/date-service';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';

@Component({
  selector: 'app-duplicate-sitting-records',
  templateUrl: './duplicate-sitting-records.component.html',
  styleUrls: ['./duplicate-sitting-records.component.scss']
})
export class DuplicateSittingRecordsComponent {

  recordsWithErrors;

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router
  ){}

  navigateToPreviousPage(){
    void this.router.navigate(['../addConfirm'])
  }

  cancelCurrentFlow(){
    void this.router.navigate(['../manage'])
  }

  resubmitSittingRecords(){
    void this.router.navigate(['../addSuccess'])
  }

}
