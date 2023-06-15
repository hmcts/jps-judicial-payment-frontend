import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DateService } from 'src/app/_services/date-service/date-service';
import { SittingRecordWorkflowService } from 'src/app/_workflows/sitting-record-workflow.service';

@Component({
  selector: 'app-add-sitting-record-success',
  templateUrl: './add-sitting-record-success.component.html',
  styleUrls: ['./add-sitting-record-success.component.scss']
})
export class AddSittingRecordSuccessComponent implements OnInit {
  tribService!: string;
  venueSiteName!: string;
  date!: string;
  newSittingRecords!: FormGroup;

  navigateBackToStart(){
    this.srWorkFlow.resetFormData();
    this.srWorkFlow.resetVisitedManaged();
    this.srWorkFlow.resetAddSittingRecords();
    this.srWorkFlow.resetCameFromConfirm();
    void this.router.navigate(['sittingRecords','manage']);
  }

  convertPeriod(period: string): string{
    return this.dateSvc.convertPeriod(period);
  }

  get johFormArray(): FormArray {
    return this.newSittingRecords?.controls['JOH'] as FormArray;
  }

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router,
    ){}

  ngOnInit(){
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venueSiteName = venue.site_name;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);

    this.newSittingRecords = this.srWorkFlow.getAddSittingRecords();

  }
}
