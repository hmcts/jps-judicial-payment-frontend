import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/_services/user-info-service/user-info-service';
import { DuplicateRecordWorkflowService } from 'src/app/_workflows/duplicate-record-workflow.service';
import { RecorderWorkflowService } from 'src/app/_workflows/recorder-workflow.service';

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
    private recorderWorkFlow: RecorderWorkflowService,
    private uInfoSvc: UserInfoService,
    private router: Router
  ){}

  ngOnInit(){
    this.validRecords = this.drWorkFlow.getValidResolvedRecords();
    this.currentUser = this.uInfoSvc.getUserName()
  }

  navigateBackToStart(){
    this.recorderWorkFlow.resetCameFromConfirm()
    this.recorderWorkFlow.resetAddSittingRecords()
    this.router.navigate(['sittingRecords', 'view'])
  }

}
