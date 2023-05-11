import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';

@Component({
  selector: 'app-delete-success',
  templateUrl: './delete-success.component.html',
  styleUrls: ['./delete-success.component.scss']
})
export class DeleteSuccessComponent {

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private router: Router,
  ){}

  navigateToView(){
    this.srWorkFlow.getTableData()
    this.router.navigate(['sittingRecords', 'view'])
  }

}
