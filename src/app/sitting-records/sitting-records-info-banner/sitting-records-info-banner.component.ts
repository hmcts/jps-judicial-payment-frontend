import { Component, Input, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service/date-service';

@Component({
  selector: 'app-sitting-records-info-banner',
  templateUrl: './sitting-records-info-banner.component.html',
  styleUrls: ['./sitting-records-info-banner.component.scss']
})
export class SittingRecordsInfoBannerComponent implements OnInit {
  tribService: string | undefined;
  venue: string | undefined;
  date: string | undefined;

  @Input() amendedText: string | undefined;

  constructor(
    private dateSvc: DateService,
    private srWorkFlow: SittingRecordWorkflowService,
  ){}

  ngOnInit() {
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService.service;
    this.venue = venue.site_name;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
  }

}