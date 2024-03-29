import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DuplicateRecordWorkflowService } from '../../_workflows/duplicate-record-workflow.service'
import { DuplicateResponse } from 'src/app/_models/addSittingRecords.model';
@Component({
  selector: 'app-duplicate-sitting-records',
  templateUrl: './duplicate-sitting-records.component.html',
  styleUrls: ['./duplicate-sitting-records.component.scss']
})
export class DuplicateSittingRecordsComponent implements OnInit {


  recordsWithErrors;
  optionsSelected: (true | false | null)[] = []
  validRecords: DuplicateResponse[] = [];
  errorMessages: Array<string> = [];

  constructor(
    public drWorkFlow: DuplicateRecordWorkflowService,
    private router: Router
  ) { }

  ngOnInit() {
    const {validRecords, optionsSelected, errorRecords} = this.drWorkFlow.getDuplicateRecordErrors();
    this.optionsSelected = optionsSelected;
    this.validRecords = validRecords
    this.recordsWithErrors = errorRecords
    this.errorMessages = this.drWorkFlow.getDuplicateRecordText(this.recordsWithErrors)

  }

  updateReplaceDuplicate($event: boolean, index: number) {
    this.optionsSelected[index] = $event;
    
  }

  navigateToPreviousPage() {
    void this.router.navigate(['sittingRecords', 'addConfirm'])
  }

  cancelCurrentFlow() {
    void this.router.navigate(['../manage'])
  }

  resubmitSittingRecords() { 
    this.drWorkFlow.formResolvedDuplicateObject(this.recordsWithErrors, this.validRecords, this.optionsSelected)
    this.drWorkFlow.checkForRecordsToSubmit(this.optionsSelected)
    .subscribe((needsConfirm) => {
      if(needsConfirm){
        void this.router.navigate(['sittingRecords', 'confirmDuplicates'])
      }else{
        void this.router.navigate(['sittingRecords', 'confirmExisting'])
      }
    })
  }

  get allOptionsSelected() {
    return this.optionsSelected.every(val => val !== null);
  }

}
