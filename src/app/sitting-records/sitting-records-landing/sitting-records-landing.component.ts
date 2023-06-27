import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing-manage-records/sitting-records-landing-manage-records.component';

@Component({
  selector: 'app-sitting-records-landing',
  templateUrl: './sitting-records-landing.component.html',
  styleUrls: ['./sitting-records-landing.component.scss']
})
export class SittingRecordsLandingComponent implements AfterViewInit{
  userForm!: FormGroup;
  showManageRecords = false;
  @ViewChild(SittingRecordsLandingManageRecordsComponent) childComponent: SittingRecordsLandingManageRecordsComponent | undefined;
  manageRecords: FormGroup | undefined;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,

  ){
    this.userForm = this.formBuilder.group(
      {
        options: [],
      });

      this.userForm.controls['options'].valueChanges.subscribe(() => {
        if(this.userForm.controls['options'].value === 'opt2'){
          this.showManageRecords = true;
        }
        else {
          this.showManageRecords = false;
        }
      })
  }

  ngAfterViewInit() {
    this.manageRecords = this.childComponent?.manageRecords;
  }

  submitForm(){
    if(this.userForm.controls["options"].value === 'opt1')
      void this.router.navigate(['sittingRecords','manage'])
  }
}
