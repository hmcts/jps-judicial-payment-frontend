import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageSittingRecord } from '../../../_validators/sittingRecordsFormValidator/sitting-records-form-validator';
import { SubmitterWorkflowService } from '../../../_workflows/submitter-workflow.service';

@Component({
  selector: 'app-sitting-records-landing-manage-records-submitter',
  templateUrl: './sitting-records-landing-manage-records-submitter.component.html',
  styleUrls: ['./sitting-records-landing-manage-records-submitter.component.scss']
})
export class SittingRecordsLandingManageRecordsSubmitterComponent implements OnInit {

  @Output() submitterFormValid = new EventEmitter<[boolean, string]>();
  @Output() submitterFormValues = new EventEmitter<[object, string]>();


  public submitterForm!: FormGroup;
  
  constructor( 
    private formBuilder: FormBuilder,
    private submitterWorkflow: SubmitterWorkflowService,
    ){
    this.submitterForm = this.formBuilder.group({
        tribunalService: [null, [Validators.required]],
        region: [null, [Validators.required]],
        dateSelected: formBuilder.group ({
          dateDay: [null, [Validators.required,]],
          dateMonth: [null, [Validators.required,]],
          dateYear: [null, [Validators.required,]],
        },{
          validators: [
            ManageSittingRecord.validateDateFormat
        ]})
      });

      this.submitterForm.controls["region"].disable();

      this.submitterForm.valueChanges.subscribe(() => {
        if(this.submitterForm.controls["tribunalService"].value !== "" && this.submitterForm.controls["region"].disabled){
          this.submitterForm.controls["region"].enable();
        }
  
      })
  
      this.submitterForm.controls["tribunalService"].valueChanges.subscribe(() => {
        if(this.submitterForm.controls["region"].value !== ""){
          this.submitterForm.controls["region"].reset();
        }
      });
  }

  ngOnInit(): void {
    if(this.submitterWorkflow.getFormData()){
      this.submitterForm = this.submitterWorkflow.getFormData();
    }

    this.submitterForm.statusChanges.subscribe(status => {
      const isValid = status === 'VALID';
      this.submitterFormValid.emit([isValid, 'submitter']);
      if(isValid) {
        this.submitterFormValues.emit([this.submitterForm, 'submitter']);
      }
    })
  }
  
}
