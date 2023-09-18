import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sitting-records-landing-johadmin',
  templateUrl: './sitting-records-landing-johadmin.component.html',
  styleUrls: ['./sitting-records-landing-johadmin.component.scss']
})
export class SittingRecordsLandingJohadminComponent implements OnInit{
  
  public johAdminForm!: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    ){
    this.johAdminForm = this.formBuilder.group({
        tribunalService: [null, [Validators.required]],
        johName: [{value: null, disabled: true}, [Validators.required]]
      });
  
  }

  ngOnInit(){
    this.johAdminForm.controls['tribunalService'].valueChanges
    .subscribe((val) => {
      console.log(val)
      this.johAdminForm.controls['johName']?.enable();
    })
  }

}
