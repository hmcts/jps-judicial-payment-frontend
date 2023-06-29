import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing-manage-records/sitting-records-landing-manage-records.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sitting-records-landing',
  templateUrl: './sitting-records-landing.component.html',
  styleUrls: ['./sitting-records-landing.component.scss']
})
export class SittingRecordsLandingComponent implements OnInit, AfterViewInit{
  userForm!: FormGroup;
  hideManageRecords = true;
  showSubmitSittingRecordsOption = false;
  showFindAddDeleteSittingRecordsOption = false;
  @ViewChild(SittingRecordsLandingManageRecordsComponent) childComponent: SittingRecordsLandingManageRecordsComponent | undefined;
  manageRecords: FormGroup | undefined;

  constructor(
    protected router: Router,
    private cookies: CookieService,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,

  ){
      this.userForm = this.formBuilder.group(
      {
        options: [null],
      });

      this.userForm.controls['options'].valueChanges.subscribe(() => {
        if(this.userForm.controls['options'].value === 'opt2'){
          this.hideManageRecords = false;
        }
        else {
          this.hideManageRecords = true;
        }
      })
  }

  ngOnInit() {
    //const userRole = this.cookies.get('__userrole__');
    const userRole = "jps-JOH-admin";

    if(userRole && userRole.indexOf('jps-JOH-admin') != -1) {
      //show radio buttons visible to them
    } else if (userRole && userRole.indexOf('jps-submitter') != -1) {
      this.showFindAddDeleteSittingRecordsOption = true;
      this.showSubmitSittingRecordsOption = true;
    } else {
      this.showFindAddDeleteSittingRecordsOption = true;
    }
  }

  ngAfterViewInit() {
    this.manageRecords = this.childComponent?.manageRecords;
  }

  submitForm(){
    if(this.userForm.controls["options"].value === 'opt1')
      void this.router.navigate(['sittingRecords','manage'])
  }
}
