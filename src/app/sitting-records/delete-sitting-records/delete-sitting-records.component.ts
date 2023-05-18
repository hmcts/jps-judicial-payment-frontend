import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../../_services/date-service';
import { tableService } from '../../_services/table-services';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DeleteSittingRecordHttp } from '../../_services/delete-sitting-records-http-service'

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

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router,
    private tsvc: tableService,
    private deleteRecordHttp: DeleteSittingRecordHttp
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

  confirmDelete(){
    this.apiError = false
    this.deleteRecordHttp.deleteRecord(this.recordToDelete.recordID).subscribe(
      () => {
        this.router.navigate(['sittingRecords', 'deleteSuccess'])
      },  
      () => {
        this.apiError = true
      }
    )
  }

  goBack(){
    this.srWorkFlow.resetSittingRecordToDelete()
    this.router.navigate(['sittingRecords', 'manage'])
  }

}
