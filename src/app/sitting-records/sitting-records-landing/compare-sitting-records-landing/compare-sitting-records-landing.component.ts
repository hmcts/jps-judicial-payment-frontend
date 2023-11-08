import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageSittingRecord } from '../../../_validators/sittingRecordsFormValidator/sitting-records-form-validator';

@Component({
  selector: 'app-compare-sitting-records-landing',
  templateUrl: './compare-sitting-records-landing.component.html',
  styleUrls: ['./compare-sitting-records-landing.component.scss']
})
export class CompareSittingRecordsLandingComponent implements OnInit{

  public compareRecordForm!: FormGroup;

  @Output() compareRecordFormValid = new EventEmitter<[boolean, string]>();
  @Output() compareRecordFormValues = new EventEmitter<[object, string]>();

  constructor( 
    private formBuilder: FormBuilder,
    ){
    this.compareRecordForm = this.formBuilder.group({
        tribunalService: [null, [Validators.required]],
        region: [null, [Validators.required]],
        startDate: formBuilder.group ({
          dateDay: [null, [Validators.required,]],
          dateMonth: [null, [Validators.required,]],
          dateYear: [null, [Validators.required,]],
        },{
          validators: [
            ManageSittingRecord.validateDateFormat
        ]}),
        endDate: formBuilder.group ({
          dateDay: [null, [Validators.required,]],
          dateMonth: [null, [Validators.required,]],
          dateYear: [null, [Validators.required,]],
        },{
          validators: [
            ManageSittingRecord.validateDateFormat
        ]}),
      });

      this.compareRecordForm.setValidators(ManageSittingRecord.dateLessThan('startDate', 'endDate'));
      this.compareRecordForm.updateValueAndValidity();
  
      this.compareRecordForm.controls["region"].disable();

      this.compareRecordForm.valueChanges.subscribe(() => {
        if(this.compareRecordForm.controls["tribunalService"].value !== "" && this.compareRecordForm.controls["region"].disabled){
          this.compareRecordForm.controls["region"].enable();
        }
  
      })
  
      this.compareRecordForm.controls["tribunalService"].valueChanges.subscribe(() => {
        if(this.compareRecordForm.controls["region"].value !== ""){
          this.compareRecordForm.controls["region"].reset();
        }
      });

  }

  ngOnInit(): void {
    this.compareRecordForm.statusChanges.subscribe(status => {
      const isValid = status === 'VALID';
      this.compareRecordFormValid.emit([isValid, 'compareRecords']);
      if(isValid) {
        this.compareRecordFormValues.emit([this.compareRecordForm, 'compareRecords']);
      }
    })
  }

}
