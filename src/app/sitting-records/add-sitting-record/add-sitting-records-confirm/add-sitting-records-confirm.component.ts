import { Component } from '@angular/core';
import { SittingRecordWorkflowService } from '../../../_workflows/sitting-record-workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sitting-records-confirm',
  templateUrl: './add-sitting-records-confirm.component.html',
  styleUrls: ['./add-sitting-records-confirm.component.scss']
})
export class AddSittingRecordsConfirmComponent{

  newSittingRecords;

  constructor(
    public srWorkFlow: SittingRecordWorkflowService,
    public router: Router,
  ) {
    this.newSittingRecords = this.srWorkFlow.getAddSittingRecords();
  }
  cancelAdd(){
    this.srWorkFlow.resetCameFromConfirm()
    this.srWorkFlow.resetAddSittingRecords()
    this.router.navigate(['sittingRecords', 'manage'])
  }
  goBack(){
    this.srWorkFlow.setCameFromConfirm();
    this.router.navigate(['sittingRecords', 'add'])
  }
  submitNewRecords(){
    this.srWorkFlow.formAndPostNewSittingRecord(() =>{
      this.router.navigate(['sittingRecords', 'addSuccess'])
    })
  }
  convertPeriod(period){
    switch(period){
      case 'am':
        return "Morning"
      case 'pm':
        return "Afternoon"
      case 'both':
        return "Full Day"
      default:
        return ''
    }
  }

}
