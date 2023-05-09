import { Component, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { Router } from '@angular/router';
import { defaultDtOptions }  from '../../_services/default-dt-options'

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
    const amBool = am === 'true' ? true : false
    const pmBool = pm === 'true' ? true : false
    if(amBool && pmBool){ return "Full Day" }
    if(amBool){ return "Morning" }
    if(pmBool){ return "Afternoon" }
    return ""
  }

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router
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

}
