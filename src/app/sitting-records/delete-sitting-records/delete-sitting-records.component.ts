import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecorderWorkflowService } from '../../_workflows/recorder-workflow.service';
import { DeleteSittingRecordHttp } from '../../_services/delete-sitting-records-http-service'
import { defaultDtOptions }  from '../../_services/default-dt-options'
import { SittingRecord } from '../../_models/sittingRecord.model';

@Component({
  selector: 'app-delete-sitting-records',
  templateUrl: './delete-sitting-records.component.html',
  styleUrls: ['./delete-sitting-records.component.scss']
})
export class DeleteSittingRecordsComponent implements OnInit{
  tribService!: string;
  venue!: string;
  date!: string;
  recordToDelete?: SittingRecord;
  apiError = false;
  selectedVenue: string | undefined;
  apiErrorMsg;
  dtOptions: DataTables.Settings = {};

  constructor(
    private recorderWorkFlow: RecorderWorkflowService,
    private router: Router,
    private deleteRecordHttp: DeleteSittingRecordHttp
  ){
    this.dtOptions = {
      ...defaultDtOptions,
      columnDefs:[
        { targets: [0, 1, 2, 3, 4, 5], orderable: false, searchable: false },
      ],
      info: false,
      order: [],
      drawCallback: 
        /* istanbul ignore next */ 
        () => {
        /* istanbul ignore next */
        document
          .querySelectorAll(`#deleteRecordViewTable_info`)
          .forEach((elem) => elem.classList.add('govuk-body'))

        document
          .querySelectorAll(`#deleteRecordViewTable_paginate`)
          .forEach((elem) => elem.classList.add('govuk-body'))

      }
    }
  }

  ngOnInit(){
    this.recordToDelete = this.recorderWorkFlow.getSittingRecordToDelete();
    const {venue} = this.recorderWorkFlow.getFormData().value
    this.selectedVenue = venue.court_name;
  }
  
  confirmDelete() {
    this.apiError = false;
    if(!this.recordToDelete){
      this.apiError = true
      this.apiErrorMsg = `An error has occured.`
      return;
    } 
    this.deleteRecordHttp.deleteRecord(this.recordToDelete.sittingRecordId)
      .subscribe({
        next: () => {
          void this.router.navigate(['sittingRecords', 'deleteSuccess'])
        },
        error: (error) => {
          const errorMsg = error.error.message;
          if(errorMsg.indexOf("User IDAM ID does not match the oldest Changed by IDAM ID")  == 0 ){
            this.apiErrorMsg = `Selected sitting record was not recorded by the recorder. Record cannot be deleted.`
          }else{
            this.apiErrorMsg = errorMsg
          }
          this.apiError = true;
        }
      });
  }

  goBack(){
    this.recorderWorkFlow.resetSittingRecordToDelete()
    this.router.navigate(['sittingRecords', 'view'])
  }

}
