import { Component, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-sitting-records',
  templateUrl: './view-sitting-records.component.html',
  styleUrls: ['./view-sitting-records.component.scss']
})
export class ViewSittingRecordsComponent implements OnInit {

  tribService: string = "";
  venue: string = "";
  date: string = "";

  goBack(){
    this.router.navigate(['sittingRecords','manage'])
  }

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router
  ){};
    
  ngOnInit(){
    let formData = this.srWorkFlow.getFormData().value;
    let { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venue = venue;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
  }

}
