import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageSittingRecord } from '../../../_validators/sittingRecordsFormValidator/sitting-records-form-validator';
import { LocationService } from '../../../_services/location-service/location.service';
import { RegionModel } from '../../../_models/region.model';

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
    private locationService : LocationService
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
            ManageSittingRecord.validateDateFormat
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

  get f() {
    return this.manageRecords?.controls;
  }

  public getRegions(): void {
    this.locationService.getAllRegions().subscribe(regions => {this.regions = regions});
  }
}
