import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from 'src/app/_services/date-service/date-service';
import { SittingRecordWorkflowService } from 'src/app/_workflows/sitting-record-workflow.service';

@Component({
  selector: 'app-add-sitting-record-success',
  templateUrl: './add-sitting-record-success.component.html',
  styleUrls: ['./add-sitting-record-success.component.scss']
})
export class AddSittingRecordSuccessComponent implements OnInit {
  tribService: any;
  venue: any;
  date: any;

  navigateBackToStart(){
    this.srWorkFlow.resetFormData();
    this.srWorkFlow.resetVisitedManaged();
    this.router.navigate(['sittingRecords','manage']);
  }

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router,
    ){

    }

  ngOnInit(){
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venue = venue;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
  }
}
