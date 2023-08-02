import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedVenue: string | undefined;
  apiErrorMsg;

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private router: Router,
    private deleteRecordHttp: DeleteSittingRecordHttp
  ){}

  ngOnInit(){
    this.recordToDelete = this.srWorkFlow.getSittingRecordToDelete();
    const {venue} = this.srWorkFlow.getFormData().value
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
          this.apiErrorMsg = error.error.message.split(':')[1];
          this.apiError = true;
        }
      });
  }

  goBack(){
    this.srWorkFlow.resetSittingRecordToDelete()
    this.router.navigate(['sittingRecords', 'manage'])
  }

}
