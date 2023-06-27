import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/_validators/sitting-records-form-validator';

@Component({
  selector: 'app-sitting-records-landing-manage-records',
  templateUrl: './sitting-records-landing-manage-records.component.html',
  styleUrls: ['./sitting-records-landing-manage-records.component.scss']
})
export class SittingRecordsLandingManageRecordsComponent {
  manageRecords!: FormGroup;

  constructor( private formBuilder: FormBuilder ){
    this.manageRecords = this.formBuilder.group({
        tribunalService: ['', [Validators.required]],
        region: ['', [Validators.required]],
        dateSelected: formBuilder.group ({
          dateDay: ['', [Validators.required,]],
          dateMonth: ['', [Validators.required,]],
          dateYear: ['', [Validators.required,]],
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

  get f() {
    return this.manageRecords?.controls;
  }
}
