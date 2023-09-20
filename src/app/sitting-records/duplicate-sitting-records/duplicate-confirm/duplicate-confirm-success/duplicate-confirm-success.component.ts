import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/_services/user-info-service/user-info-service';
import { DuplicateRecordWorkflowService } from 'src/app/_workflows/duplicate-record-workflow.service';
import { SittingRecordWorkflowService } from 'src/app/_workflows/sitting-record-workflow.service';

@Component({
  selector: 'app-duplicate-confirm-success',
  templateUrl: './duplicate-confirm-success.component.html',
  styleUrls: ['./duplicate-confirm-success.component.scss']
})
export class DuplicateConfirmSuccessComponent implements OnInit {

  validRecords;
  currentUser!: string;

  constructor(
    private drWorkFlow: DuplicateRecordWorkflowService,
    private srWorkFlow: SittingRecordWorkflowService,
    private uInfoSvc: UserInfoService,
    private router: Router
  ){}

  ngOnInit(){
    this.validRecords = this.drWorkFlow.getValidResolvedRecords();
    this.currentUser = this.uInfoSvc.getUserName()
  }

  navigateBackToStart(){
    this.srWorkFlow.resetCameFromConfirm()
    this.srWorkFlow.resetAddSittingRecords()
    this.router.navigate(['sittingRecords', 'view'])
  }

}
