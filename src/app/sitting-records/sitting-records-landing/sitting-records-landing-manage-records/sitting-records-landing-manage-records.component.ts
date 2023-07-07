import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../_validators/sitting-records-form-validator';
import { LocationService } from '../../../_services/location-service/location.service';
import { RegionModel } from '../../../_models/region.model';
import { SubmitterWorkflowService } from '../../../_workflows/submitter-workflow.service';

@Component({
  selector: 'app-sitting-records-landing-manage-records',
  templateUrl: './sitting-records-landing-manage-records.component.html',
  styleUrls: ['./sitting-records-landing-manage-records.component.scss']
})
export class SittingRecordsLandingManageRecordsComponent {
  public manageRecords!: FormGroup;
  regions: RegionModel[] = [];
  
  constructor( 
    private formBuilder: FormBuilder,
    private locationService : LocationService,
    private srWorkFlow: SubmitterWorkflowService,
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
          this.getRegions();
        }
  
      })
  
      this.manageRecords.controls["tribunalService"].valueChanges.subscribe(() => {
        if(this.manageRecords.controls["region"].value !== ""){
          this.manageRecords.controls["region"].reset();
        }
      });
  }

  ngOnInit(): void {
    if(this.srWorkFlow.getFormData()){
      this.manageRecords = this.srWorkFlow.getFormData();
    }
  }

  get f() {
    return this.manageRecords?.controls;
  }

  public getRegions(): void {
    this.locationService.getAllRegions().subscribe(regions => {this.regions = regions});
  }
}
