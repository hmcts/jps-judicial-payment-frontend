import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../_validators/sitting-records-form-validator';
import { PublisherWorkflowService } from '../../../_workflows/publisher-workflow.service';

@Component({
  selector: 'app-sitting-records-landing-manage-records-publisher',
  templateUrl: './sitting-records-landing-manage-records-publisher.component.html',
  styleUrls: ['./sitting-records-landing-manage-records-publisher.component.scss']
})
export class SittingRecordsLandingManageRecordsPublisherComponent implements OnInit {

  @Output() publisherFormValid = new EventEmitter<[boolean, string]>();
  @Output() publisherFormValues = new EventEmitter<[object, string]>();
  
  public publisherForm!: FormGroup;
  
  constructor( 
    private formBuilder: FormBuilder,
    private publisherWorkflow: PublisherWorkflowService,
    ){
    this.publisherForm = this.formBuilder.group({
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
      this.publisherForm = this.publisherWorkflow.getFormData();
    }

    this.publisherForm.statusChanges.subscribe(status => {
      const isValid = status === 'VALID';
      this.publisherFormValid.emit([isValid, 'publisher']);
      if(isValid){
        this.publisherFormValues.emit([this.publisherForm, 'publisher']);
      }
    })
  }
}
