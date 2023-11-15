

import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { Subject, takeUntil } from 'rxjs';
import { CompareRecordsWorkflowService } from 'src/app/_workflows/compare-record-workflow.service';

enum Options {
  SubmitToFinance = 'submitToFinance',
  ManageSittingRecords = 'manageSittingRecords',
  PublishRecords = 'publishRecords',
}
@Component({
  selector: 'app-sitting-records-landing',
  templateUrl: './sitting-records-landing.component.html',
  styleUrls: ['./sitting-records-landing.component.scss']
})

export class SittingRecordsLandingComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  userForm!: FormGroup;
  hideManageRecordsSubmitter = true;
  hideManageRecordsPublisher = true;
  hideManageRecordsJohAdmin = true;
  hideCompareSittingRecords = true;

  showSubmitSittingRecordsOption = false;
  showFindAddDeleteSittingRecordsOption = false;
  showViewExportSittingRecordsOption = false;
  showCreatePayrollFilePublishSittingRecordsOption = false;
  showHeadingForPublisher = false;
  showViewOrManageJudicialInfo = false;
  showCompareSittingRecords = false;

  manageRecordsSubmitter!: FormGroup | undefined;
  manageRecordsPublisher!: FormGroup | undefined;
  userRole = '';

  publisherFormValid = false;
  submitterFormValid = false;
  johAdminFormValid = false;
  compareFormValid = false;

  submitterFormValues;
  publisherFormValues;
  johAdminFormValues;
  compareFormValues;

  options = Options;

  constructor(
    protected router: Router,
    private cookies: CookieService,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private submitterWorkflow : SubmitterWorkflowService,
    private publisherWorkflow : PublisherWorkflowService,
    private adminWorkflow: AdminWorkflowService,
    private comparisonWorkflow: CompareRecordsWorkflowService

  ){
      this.userForm = this.formBuilder.group(
      {
        options: [null],
      });

      this.userRole = this.cookies.get('__userrole__');
  
    this.configureUserRoleSettings();
    this.initializeUserForm();
    this.subscribeToUserFormChanges();
  }

  handleFormValidChange(isValid){
    if(isValid[1] === 'submitter'){
      this.submitterFormValid = isValid[0];
    }
    else if(isValid[1] === 'publisher'){
      this.publisherFormValid = isValid[0];
    }
    else if (isValid[1] == 'johAdmin'){
      this.johAdminFormValid = isValid[0];
    }
    else if (isValid[1] == 'compareRecords'){
      this.compareFormValid = isValid[0]
    }
  }

  handleFormValues(value){
    console.log(value)
    if(value[1] === 'submitter'){
      this.submitterFormValues = value[0];
    }
    else if(value[1] === 'publisher'){
      this.publisherFormValues = value[0];
    }
    else if(value[1] === 'johAdmin'){
      this.johAdminFormValues = value[0];
    }
    else if(value[1] === 'compareRecords'){
      this.compareFormValues = value[0]
    }
  }

  ngOnInit() {
    this.userRole = this.cookies.get('__userrole__');
  }
  
  configureUserRoleSettings() {
    if (this.userRole.includes('jps-JOH-admin')) {
      this.showViewOrManageJudicialInfo = true;
    } else if (this.userRole.includes('jps-publisher')) {
      this.showHeadingForPublisher = true;
      this.showViewExportSittingRecordsOption = true;
      this.showCreatePayrollFilePublishSittingRecordsOption = true;
    } else if (this.userRole.includes('jps-submitter')) {
      this.showFindAddDeleteSittingRecordsOption = true;
      this.showSubmitSittingRecordsOption = true;
      this.showCompareSittingRecords = true;
    } else {
      this.showFindAddDeleteSittingRecordsOption = true;
    }
  }
  
  private initializeUserForm() {
    const submitterData = this.submitterWorkflow.getUserLandingData();
    const publisherData = this.publisherWorkflow.getUserLandingData();

    if(submitterData || publisherData){
      this.userForm = submitterData || publisherData ;
    }
    
    const optionValue = this.userForm.controls['options'].value;
    this.hideManageRecordsSubmitter = optionValue !== 'submitToFinance';
    this.hideManageRecordsPublisher = optionValue !== 'publishRecords';
  }
  
  private subscribeToUserFormChanges() {
    this.userForm.controls['options'].valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(optionValue => {
      this.hideManageRecordsSubmitter = optionValue !== 'submitToFinance';
      this.hideManageRecordsPublisher = optionValue !== 'publishRecords';
      this.hideManageRecordsJohAdmin = optionValue !== 'viewManageJudicialInfo';
      this.hideCompareSittingRecords = optionValue !== 'compareSittingRecords';
    });
  }
  
  submitForm() {
    
    const optionValue = this.userForm.controls["options"].value;
    const isSubmitter = this.userRole.indexOf('jps-submitter') !== -1;
    const isAdmin = this.userRole.indexOf('jps-admin') !== -1;
  
    const workflows: { [key: string]: any } = {};
  
    if (isSubmitter) {
      workflows['manageSittingRecords'] = this.submitterWorkflow;
      workflows['submitToFinance'] = this.submitterWorkflow;
      workflows['compareSittingRecords'] = this.comparisonWorkflow;
    }
    
    if (isAdmin) {
      workflows['manageSittingRecords'] = this.adminWorkflow;
    }
  
    workflows['publishRecords'] = this.publisherWorkflow;
  
    const selectedWorkflow = workflows[optionValue];
    console.log(selectedWorkflow)
    if (selectedWorkflow) {
      selectedWorkflow.setUserLandingData(this.userForm);
      selectedWorkflow.setLandingVisited();
      switch (optionValue) {
        case 'submitToFinance':
          selectedWorkflow.setFormData(this.submitterFormValues);
          void this.router.navigate(['sittingRecords', 'submit']);
          break;
        case 'publishRecords':
          selectedWorkflow.setFormData(this.publisherFormValues);
          break;
        case 'manageSittingRecords':
          void this.router.navigate(['sittingRecords', 'manage']);
          break;
        case 'viewManageJudicialInfo':
          selectedWorkflow.setFormData(this.johAdminFormValues);
          break;
        case 'compareSittingRecords':
          selectedWorkflow.setFormData(this.compareFormValues)
          void this.router.navigate(['sittingRecords', 'compare']);
          break;
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
