import { Component, OnInit } from '@angular/core';
import { ManageSittingRecordsWorkflowService } from '../../_workflows/manage-sitting-record-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { defaultDtOptions }  from '../../_services/default-dt-options'
import { SittingRecord } from 'src/app/_models/viewSittingRecords.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-sitting-records',
  templateUrl: './view-sitting-records.component.html',
  styleUrls: ['./view-sitting-records.component.scss']
})
export class ViewSittingRecordsComponent implements OnInit {

  tribService = "";
  venueSiteName = "";
  date = "";

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  sittingRecordData: SittingRecord[] = [];

  showFilters = false;

  goBack(){
    void this.router.navigate(['sittingRecords','manage'])
  }

  getPeriod(am: string, pm: string): string {
    return this.dateSvc.getPeriod(am, pm);
  }

  constructor(
    private msrWorkFlow: ManageSittingRecordsWorkflowService,
    private dateSvc: DateService,
    private router: Router
  ){}
    
  ngOnInit(){
    const formData = this.msrWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService.service;
    this.venueSiteName = venue.site_name;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);

    this.dtOptions = {
      ...defaultDtOptions,
      columnDefs:[
        { targets: [5], orderable: false },
      ],
      
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

    this.loadViewSittingRecords();
  } 

  loadViewSittingRecords() {
    this.msrWorkFlow.getSittingRecordsData().subscribe(
      records => {
        this.sittingRecordData = records.sittingRecords;
        this.dtTrigger.next(null); 
      },
      () => {
        this.sittingRecordData = []
        this.dtTrigger.next(null);
      }
    );
    
  }

}
