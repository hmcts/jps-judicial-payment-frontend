import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../_validators/sitting-records-form-validator';
import { LocationService } from '../../../_services/location-service/location.service';
import { RegionModel } from '../../../_models/region.model';
import { SubmitterWorkflowService } from '../../../_workflows/submitter-workflow.service';

@Component({
  selector: 'app-sitting-records-landing-manage-records-submitter',
  templateUrl: './sitting-records-landing-manage-records-submitter.component.html',
  styleUrls: ['./sitting-records-landing-manage-records-submitter.component.scss']
})
export class SittingRecordsLandingManageRecordsSubmitterComponent implements OnInit {
  public manageRecords!: FormGroup;
   
  constructor( 
    private formBuilder: FormBuilder,
    private locationService : LocationService,
    private submitterWorkflow: SubmitterWorkflowService,
    ){
    this.manageRecords = this.formBuilder.group({
        tribunalService: [null, [Validators.required]],
        region: [null, [Validators.required]],
        dateSelected: formBuilder.group ({
          dateDay: [null, [Validators.required,]],
          dateMonth: [null, [Validators.required,]],
          dateYear: [null, [Validators.required,]],
        },{
          validators: [
            CustomValidators.validateDateFormat
        ]})
      });

      this.manageRecords.controls["region"].disable();

      this.manageRecords.valueChanges.subscribe(() => {
        if(this.manageRecords.controls["tribunalService"].value !== "" && this.manageRecords.controls["region"].disabled){
          this.manageRecords.controls["region"].enable();
        }
  
      })
  
      this.manageRecords.controls["tribunalService"].valueChanges.subscribe(() => {
        if(this.manageRecords.controls["region"].value !== ""){
          this.manageRecords.controls["region"].reset();
        }
      });
  }

  ngOnInit(): void {
    if(this.submitterWorkflow.getFormData()){
      this.manageRecords = this.submitterWorkflow.getFormData();
    }
  }
  
}
