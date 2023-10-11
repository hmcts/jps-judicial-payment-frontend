import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteValidator } from '../../../_validators/autoCompleteValidator/auto-complete-validator';

@Component({
  selector: 'app-sitting-records-landing-johadmin',
  templateUrl: './sitting-records-landing-johadmin.component.html',
  styleUrls: ['./sitting-records-landing-johadmin.component.scss']
})
export class SittingRecordsLandingJohadminComponent implements OnInit{
  
  @Output() johAdminFormValid = new EventEmitter<[boolean, string]>();
  @Output() johAdminFormValues = new EventEmitter<[object, string]>();
  
  public johAdminForm!: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    ){
    this.johAdminForm = this.formBuilder.group({
        tribunalService: [null, [Validators.required]],
        johName: [{value: '', disabled: true}, [Validators.required, AutoCompleteValidator.requireSelection]]
      });
  
  }

  ngOnInit(){
    this.johAdminForm.controls['tribunalService'].valueChanges
    .subscribe(() => {
      this.johAdminForm.controls['johName']?.enable();
    })

    this.johAdminForm.statusChanges.subscribe(status => {
      const isValid = status === 'VALID';
      this.johAdminFormValid.emit([isValid, 'johAdmin']);
      if(isValid){
        this.johAdminFormValues.emit([this.johAdminForm, 'johAdmin']);
      }
    })

  }

}
