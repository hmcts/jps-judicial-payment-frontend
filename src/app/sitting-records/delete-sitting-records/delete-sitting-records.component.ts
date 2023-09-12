import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageSittingRecordsWorkflowService } from '../../_workflows/manage-sitting-record-workflow.service';
import { DeleteSittingRecordHttp } from '../../_services/delete-sitting-records-http-service'
import { defaultDtOptions }  from '../../_services/default-dt-options'

@Component({
  selector: 'app-delete-sitting-records',
  templateUrl: './delete-sitting-records.component.html',
  styleUrls: ['./delete-sitting-records.component.scss']
})
export class DeleteSittingRecordsComponent implements OnInit{
  tribService!: string;
  venue!: string;
  date!: string;
  recordToDelete: any;
  apiError = false;
  selectedVenue: string | undefined;
  apiErrorMsg;
  dtOptions: DataTables.Settings = {};

  constructor(
    private msrWorkFlow: ManageSittingRecordsWorkflowService,
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
    this.recordToDelete = this.msrWorkFlow.getSittingRecordToDelete();
    const {venue} = this.msrWorkFlow.getFormData().value
    this.selectedVenue = venue.site_name;
  }
  
  confirmDelete() {
    this.apiError = false;
    this.deleteRecordHttp.deleteRecord(this.recordToDelete.sittingRecordId)
      .subscribe({
        next: () => {
          void this.router.navigate(['sittingRecords', 'deleteSuccess'])
        },
        error: (error) => {
          const errorMsg = error.error.message.split(':')[1];
          if(errorMsg == " User IDAM ID does not match the oldest Changed by IDAM ID "){
            this.apiErrorMsg = `Selected sitting record was not recorded by the recorder. Record cannot be deleted.`
          }else{
            this.apiErrorMsg = errorMsg
          }
          this.apiError = true;
        }
      });
  }

  goBack(){
    this.msrWorkFlow.resetSittingRecordToDelete()
    this.router.navigate(['sittingRecords', 'view'])
  }

}
