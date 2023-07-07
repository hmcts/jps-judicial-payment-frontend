import { Component, OnInit } from '@angular/core';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import { defaultDtOptions }  from '../../_services/default-dt-options'
import { SittingRecord } from 'src/app/_models/viewSittingRecords.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-submit-sitting-records',
  templateUrl: './submit-sitting-records.component.html',
  styleUrls: ['./submit-sitting-records.component.scss']
})
export class SubmitSittingRecordsComponent implements OnInit {

  tribService = "";
  region = "";
  date = "";
 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  sittingRecordData: SittingRecord[] = [];

  showFilters = false;

  goBack(){
    void this.router.navigate(['sittingRecords','home'])
  }

  /*getPeriod(am: string, pm: string): string {
    return this.dateSvc.getPeriod(am, pm);
  }*/

  constructor(
    private srWorkFlow: PublisherWorkflowService,
    private dateSvc: DateService,
    private router: Router
  ){}
    
  ngOnInit(){
    console.log(this.srWorkFlow.getFormData().value);
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, region } = formData;
    this.tribService = tribunalService;
    this.region = region.description;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);

    this.dtOptions = {
      ...defaultDtOptions,
      
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

    //this.loadViewSittingRecords();
  } 

  getPeriod(am: string, pm: string): string {
    return this.dateSvc.getPeriod(am, pm);
  }

  /*loadViewSittingRecords() {
    this.srWorkFlow.getSittingRecordsData().subscribe(records => {
      this.sittingRecordData = records.sittingRecords;
      this.dtTrigger.next(null); 
    });
  }*/

}
