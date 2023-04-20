import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageSittingRecord } from '../../_validators/sitting-records-form-validator';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';

@Component({
  selector: 'app-manage-sitting-records',
  templateUrl: './manage-sitting-records.component.html',
  styleUrls: ['./manage-sitting-records.component.scss']
})
export class ManageSittingRecordsComponent implements OnInit {
  manageRecords: FormGroup;

  submitForm(){
    this.srWorkFlow.setFormData(this.manageRecords)
    this.srWorkFlow.setManageVisited()
    this.router.navigate(['sittingRecords','view'])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.manageRecords?.controls;
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srWorkFlow: SittingRecordWorkflowService
  ){
    this.manageRecords = this.formBuilder.group(
      {
        tribunalService: [null, Validators.required],
        venue: [null, [Validators.required,]],
        dateSelected: formBuilder.group({
          dateDay: null,
          dateMonth: null,
          dateYear: null,
        },{
          validators: [
            ManageSittingRecord.validateDateFormat
          ]
        })
        
      }
    );
    this.manageRecords.controls['venue'].disable();
    
    this.manageRecords.valueChanges.subscribe(() => {
      if(this.manageRecords.controls['tribunalService'].value !== "" && this.manageRecords.controls['venue'].disabled){
        this.manageRecords.controls['venue'].enable();
      }

    })

    this.manageRecords.controls['tribunalService'].valueChanges.subscribe(() => {
      if(this.manageRecords.controls['venue'].value !== ""){
        this.manageRecords.controls['venue'].reset();
      }
    });

  }

  ngOnInit(): void {
    if(this.srWorkFlow.getFormData()){
      this.manageRecords = this.srWorkFlow.getFormData();
    }
  }
}

