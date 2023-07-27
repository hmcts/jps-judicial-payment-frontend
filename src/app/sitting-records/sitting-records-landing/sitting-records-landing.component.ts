import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SittingRecordsLandingManageRecordsSubmitterComponent } from './sitting-records-landing-manage-records-submitter/sitting-records-landing-manage-records-submitter.component';
import { SittingRecordsLandingManageRecordsPublisherComponent } from './sitting-records-landing-manage-records-publisher/sitting-records-landing-manage-records-publisher.component';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';

@Component({
  selector: 'app-sitting-records-landing',
  templateUrl: './sitting-records-landing.component.html',
  styleUrls: ['./sitting-records-landing.component.scss']
})
export class SittingRecordsLandingComponent implements OnInit, AfterViewInit{
  userForm!: FormGroup;
  hideManageRecordsSubmitter = true;
  hideManageRecordsPublisher = true;
  showSubmitSittingRecordsOption = false;
  showFindAddDeleteSittingRecordsOption = false;
  showViewExportSittingRecordsOption = false;
  showCreatePayrollFilePublishSittingRecordsOption = false;
  showHeadingForPublisher = false;
  @ViewChild(SittingRecordsLandingManageRecordsSubmitterComponent) childComponentSubmitter: SittingRecordsLandingManageRecordsSubmitterComponent | undefined;
  @ViewChild(SittingRecordsLandingManageRecordsPublisherComponent) childComponentPublisher: SittingRecordsLandingManageRecordsPublisherComponent | undefined;
  manageRecordsSubmitter!: FormGroup | undefined;
  manageRecordsPublisher!: FormGroup | undefined;
  userRole = '';

  constructor(
    protected router: Router,
    private cookies: CookieService,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private submitterWorkflow : SubmitterWorkflowService,
    private publisherWorkflow : PublisherWorkflowService,
    private adminWorkflow: AdminWorkflowService

  ){
      this.userForm = this.formBuilder.group(
      {
        options: [null],
      });
  }

  ngOnInit() {
    this.userRole = this.cookies.get('__userrole__');
  
    if(this.userRole.indexOf('jps-JOH-admin') != -1) {
      //show radio buttons visible to them
    } else if (this.userRole.indexOf('jps-publisher') != -1) {
      this.showHeadingForPublisher = true;
      this.showViewExportSittingRecordsOption = true;
      this.showCreatePayrollFilePublishSittingRecordsOption = true;
    }
    else if (this.userRole.indexOf('jps-submitter') != -1) {
      this.showFindAddDeleteSittingRecordsOption = true;
      this.showSubmitSittingRecordsOption = true;
    } else {
      this.showFindAddDeleteSittingRecordsOption = true;
    }

    if (this.submitterWorkflow.getUserFormData()) {
      this.userForm = this.submitterWorkflow.getUserFormData();
      if(this.userForm.controls['options'].value === 'opt2'){
        this.hideManageRecordsSubmitter = false;
      }
      else {
        this.hideManageRecordsSubmitter = true;
      }
    }

    if (this.publisherWorkflow.getUserFormData()) {
      this.userForm = this.publisherWorkflow.getUserFormData();
      if(this.userForm.controls['options'].value === 'opt4'){
        this.hideManageRecordsPublisher = false;
      }
      else {
        this.hideManageRecordsPublisher = true;
      }
    }

    this.userForm.controls['options'].valueChanges.subscribe(() => {
      if(this.userForm.controls['options'].value === 'opt2'){
        this.hideManageRecordsSubmitter = false;
      }
      else {
        this.hideManageRecordsSubmitter = true;
      }

      if(this.userForm.controls['options'].value === 'opt4'){
        this.hideManageRecordsPublisher = false;
      }
      else {
        this.hideManageRecordsPublisher = true;
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.childComponentSubmitter?.manageRecords) {
        this.manageRecordsSubmitter = this.childComponentSubmitter?.manageRecords;
      }

      if (this.childComponentPublisher?.manageRecords) {
        this.manageRecordsPublisher = this.childComponentPublisher?.manageRecords;
      }

    });
  }

  submitForm(){
    if(this.userForm.controls["options"].value === 'opt1') {
      if (this.userRole.indexOf('jps-submitter') != -1) {
        this.submitterWorkflow.setUserFormData(this.userForm);
        this.submitterWorkflow.setLandingVisited();
      }

      if (this.userRole.indexOf('jps-admin') != -1) {
        this.adminWorkflow.setUserFormData(this.userForm);
        this.adminWorkflow.setLandingVisited();
      }
      void this.router.navigate(['sittingRecords','manage']);
    }
    else if (this.userForm.controls["options"].value === 'opt2') {
      this.submitterWorkflow.setUserFormData(this.userForm);
      this.submitterWorkflow.setFormData(this.manageRecordsSubmitter as FormGroup);
      this.submitterWorkflow.setLandingVisited();
      void this.router.navigate(['sittingRecords','submit'])
    }
    else if (this.userForm.controls["options"].value === 'opt4') {
      this.publisherWorkflow.setUserFormData(this.userForm);
      this.publisherWorkflow.setFormData(this.manageRecordsPublisher as FormGroup);
      this.publisherWorkflow.setLandingVisited();
    }
  }
}
