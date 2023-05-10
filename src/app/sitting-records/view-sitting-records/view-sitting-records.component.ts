import { Component, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { Router } from '@angular/router';
import { defaultDtOptions }  from '../../_services/default-dt-options'
import { tableService } from '../../_services/table-services'

@Component({
  selector: 'app-view-sitting-records',
  templateUrl: './view-sitting-records.component.html',
  styleUrls: ['./view-sitting-records.component.scss']
})
export class ViewSittingRecordsComponent implements OnInit {

  tribService = "";
  venue = "";
  date = "";

  dtOptions: DataTables.Settings = {};
  sittingRecordData;

  showFilters = false;

  goBack(){
    this.router.navigate(['sittingRecords','manage'])
  }

  getPeriod(am: string, pm: string){
    return this.tsvc.getPeriod(am, pm)
  }

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router,
    private tsvc: tableService
  ){}
    
  ngOnInit(){
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venue = venue;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);

    this.sittingRecordData = this.srWorkFlow.getTableData();

    this.dtOptions = {
      ...defaultDtOptions, 
      columnDefs:[
        {orderData: 0, targets: [0]},
        {orderData: 1, targets: [1]},
        {orderData: 2, targets: [2]},
        {orderData: 3, targets: [3]},
        {orderData: 4, targets: [4]},
        {orderData: 5, targets: [5], orderable: false},
      ],
      
      drawCallback: 
        /* istanbul ignore next */ 
        () => {
        /* istanbul ignore next */
        document
          .querySelectorAll(`#sittingRecordViewTable_info`)
          .forEach((elem) => elem.classList.add('govuk-body'))
      },
      
    };

  }

  navigateDeleteSittingRecord(sittingRecord){
    this.srWorkFlow.setSittingRecordToDelete(sittingRecord);
    this.router.navigate(['sittingRecords', 'delete'])
  }

}
