import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../_validators/sitting-records-form-validator';
import { PublisherWorkflowService } from '../../../_workflows/publisher-workflow.service';

@Component({
  selector: 'app-sitting-records-landing-manage-records-publisher',
  templateUrl: './sitting-records-landing-manage-records-publisher.component.html',
  styleUrls: ['./sitting-records-landing-manage-records-publisher.component.scss']
})
export class SittingRecordsLandingManageRecordsPublisherComponent implements OnInit {
  public manageRecords!: FormGroup;
  
  constructor( 
    private formBuilder: FormBuilder,
    private publisherWorkflow: PublisherWorkflowService,
    ){
    this.manageRecords = this.formBuilder.group({
        tribunalService: [null, [Validators.required]],
        dateSelected: formBuilder.group ({
          dateDay: [null, [Validators.required,]],
          dateMonth: [null, [Validators.required,]],
          dateYear: [null, [Validators.required,]],
        },{
          validators: [
            CustomValidators.validateDateFormat
        ]})
      });
  
  }

  ngOnInit(): void {
    if(this.publisherWorkflow.getFormData()){
      this.manageRecords = this.publisherWorkflow.getFormData();
    }
  }
}
