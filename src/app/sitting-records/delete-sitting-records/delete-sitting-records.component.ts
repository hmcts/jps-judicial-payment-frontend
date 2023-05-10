import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../../_services/date-service';
import { tableService } from '../../_services/table-services';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';

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

    this.recordToDelete = this.srWorkFlow.getSittingRecordToDelete();
  }


  getPeriod(am: string, pm: string){
    return this.tsvc.getPeriod(am, pm)
  }

  goBack(){
    this.srWorkFlow.resetSittingRecordToDelete()
    this.router.navigate(['sittingRecords', 'manage'])
  }

}
