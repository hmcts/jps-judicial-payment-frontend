import { Component, OnInit } from '@angular/core';
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
export class SittingRecordsLandingManageRecordsComponent implements OnInit{
  public manageRecords!: FormGroup;
  regions: RegionModel[] = [];
  
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
      this.regions = this.submitterWorkflow.getFinanceRegions();
      this.manageRecords = this.submitterWorkflow.getFormData();
    }else{
      // as we get all regions we only need to do this on the first load of the page
      this.getRegions();
    }
  }

  get f() {
    return this.manageRecords?.controls;
  }

  public getRegions(): void {
    this.locationService.getAllRegions().subscribe(regions => {
      this.regions = regions
      this.submitterWorkflow.setFincanceRegions(regions)
    });
  }
}
