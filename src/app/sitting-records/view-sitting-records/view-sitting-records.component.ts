import { Component, OnInit } from '@angular/core';
import { RecorderWorkflowService } from '../../_workflows/recorder-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { defaultDtOptions }  from '../../_services/default-dt-options'
import { SittingRecord } from '../../_models/viewSittingRecords.model';

@Component({
  selector: 'app-view-sitting-records',
  templateUrl: './view-sitting-records.component.html',
  styleUrls: ['./view-sitting-records.component.scss']
})
export class ViewSittingRecordsComponent implements OnInit{
  recordCount: number | undefined;
  apiError: boolean | undefined;

  constructor(
    private msrWorkFlow: RecorderWorkflowService,
    private dateSvc: DateService,
    private srWorkFlow: RecorderWorkflowService,
    private router: Router
  ){}

  tribService = "";
  venueSiteName = "";
  date = "";

  dtOptions: DataTables.Settings = {};
  sittingRecordData: SittingRecord[] = [];

  showFilters = false;
  
  goBack(){
    void this.router.navigate(['sittingRecords','manage'])
  }

  addNewRecord(){
    void this.router.navigate(['sittingRecords','add'])
  }

  ngOnInit(){
    const formData = this.msrWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService.service;
    this.venueSiteName = venue.court_name;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);

    this.dtOptions = {
      ...defaultDtOptions,
      columnDefs:[
        { targets: [5], orderable: false },
      ],
        /* istanbul ignore next */ 
      ajax: (dataTablesParameters: any, callback) => {
        /* istanbul ignore next */ 
        this.srWorkFlow.getSittingRecordsData(dataTablesParameters.start)
        .subscribe({
          next: (records) => {
            this.sittingRecordData = records.sittingRecords;
            this.recordCount = records.recordCount;
            callback({
              recordsTotal: records.recordCount,
              recordsFiltered: records.recordCount,
              data: []
            });
          },
          error: (err) => {
            this.apiError = true
            this.dtOptions.ordering = false
            this.recordCount = 0;
          }
        })
      },
      drawCallback: 
        /* istanbul ignore next */ 
        () => {
        /* istanbul ignore next */
        document
          .querySelectorAll(`#sittingRecordViewTable_info`)
          .forEach((elem) => elem.classList.add('govuk-body'))

        document
          .querySelectorAll(`#sittingRecordViewTable_paginate`)
          .forEach((elem) => elem.classList.add('govuk-body'))

      }
    };

  } 

  navigateDeleteSittingRecord(sittingRecord){
    this.msrWorkFlow.setSittingRecordToDelete(sittingRecord);
    this.router.navigate(['sittingRecords', 'delete'])
  }
  
}
