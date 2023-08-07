import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DuplicateRecordWorkflowService } from '../../_workflows/duplicate-record-workflow.service'
@Component({
  selector: 'app-duplicate-sitting-records',
  templateUrl: './duplicate-sitting-records.component.html',
  styleUrls: ['./duplicate-sitting-records.component.scss']
})
export class DuplicateSittingRecordsComponent implements OnInit {


  recordsWithErrors;
  optionsSelected: any[] = []
  validRecords: any[] = [];

  constructor(
    public drWorkFlow: DuplicateRecordWorkflowService,
    private router: Router
  ) { }

  ngOnInit() {
    const {validRecords, optionsSelected, errorRecords} = this.drWorkFlow.getDuplicateRecordErrors();
    this.optionsSelected = optionsSelected;
    this.validRecords = validRecords
    this.recordsWithErrors = errorRecords

  }

  updateReplaceDuplicate($event: boolean, index: number) {
    this.optionsSelected[index] = $event;
    
  }

  navigateToPreviousPage() {
    void this.router.navigate(['../addConfirm'])
  }

  cancelCurrentFlow() {
    void this.router.navigate(['../manage'])
  }

  resubmitSittingRecords() {
    this.drWorkFlow.postResolvedDuplicates(this.recordsWithErrors, this.optionsSelected)
    .subscribe((response) => {
      const errorRecords = response['errorRecords']
      if(response['message'] === 'success' || response === 'No_Records'){
        void this.router.navigate(['sittingRecords', 'addSuccess'])
      }else{
        this.drWorkFlow.setErrorRecords(errorRecords)
        void this.router.navigate(['sittingRecords', 'addDuplicates'])
      }
    })

  }

  get allOptionsSelected() {
    return this.optionsSelected.every(val => val !== null);
  }

}
