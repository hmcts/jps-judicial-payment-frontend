import { Component, OnInit } from '@angular/core';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { defaultDtOptions }  from '../../_services/default-dt-options'
import { SittingRecord } from 'src/app/_models/viewSittingRecords.model';

@Component({
  selector: 'app-submit-sitting-records',
  templateUrl: './submit-sitting-records.component.html',
  styleUrls: ['./submit-sitting-records.component.scss']
})
export class SubmitSittingRecordsComponent implements OnInit {

  tribService = "";
  region = "";
  date = "";

  apiError = false;
  apiErrorMessage = ['An error has occured.']

  dtOptions: DataTables.Settings = {};
  sittingRecordData: SittingRecord[] = [];

  showFilters = false;

  constructor(
    private submitterWorkflow: SubmitterWorkflowService,
    private dateSvc: DateService,
    private router: Router
  ){}
    
  ngOnInit(){
    const formData = this.submitterWorkflow.getFormData().value;
    const { dateSelected, tribunalService, region } = formData;
    this.tribService = tribunalService;
    this.region = region.description;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
    $.fn.dataTable.ext.classes.sPageButton = 'govuk-pagination__item govuk-link govuk-pagination__link blue-text';
    $.fn.dataTable.ext.classes.sPageButtonActive = 'govuk-pagination__item--current govuk-link white-text';

    this.dtOptions = {
      ...defaultDtOptions,
      paging: true,
      serverSide: true,
      ordering:false,
      ajax: (dataTablesParameters: any, callback) => {
        this.submitterWorkflow.getSittingRecordsData(dataTablesParameters.start)
        .subscribe({
          next: (records) => {
            this.apiError = false
            this.sittingRecordData = records.sittingRecords;
            callback({
              recordsTotal: records.recordCount,
              recordsFiltered: records.recordCount,
              data: []
            });
          },
          error: (err) => {
            this.apiError = true
          }
        });
      },
      drawCallback: 
        /* istanbul ignore next */ 
        () => {
        /* istanbul ignore next */
        document
          .querySelectorAll(`#submitRecordViewTable_info`)
          .forEach((elem) => elem.classList.add('govuk-body'))
        document
          .querySelector(`#submitRecordViewTable_paginate`)?.classList.add('govuk-pagination')
        document
          .querySelector(`#submitRecordViewTable_previous`)?.classList.add('govuk-pagination__prev')
          document
          .querySelector(`#submitRecordViewTable_next`)?.classList.add('govuk-pagination__next')

      }
    };

  } 

  goBack(){
    void this.router.navigate(['sittingRecords','home'])
  }

}
