import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';

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

export class SittingRecordsLandingComponent implements OnInit {

  userForm!: FormGroup;
  hideManageRecordsSubmitter = true;
  hideManageRecordsPublisher = true;
  hideManageRecordsJohAdmin = true;

  showSubmitSittingRecordsOption = false;
  showFindAddDeleteSittingRecordsOption = false;
  showViewExportSittingRecordsOption = false;
  showCreatePayrollFilePublishSittingRecordsOption = false;
  showHeadingForPublisher = false;
  showViewOrManageJudicialInfo = false;

  manageRecordsSubmitter!: FormGroup | undefined;
  manageRecordsPublisher!: FormGroup | undefined;
  userRole = '';

  publisherFormValid = false;
  submitterFormValid = false;
  johAdminFormValid = false;

  submitterFormValues;
  publisherFormValues;
  johAdminFormValues;


  options = Options;

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
  }

  handleFormValues(value){
    if(value[1] === 'submitter'){
      this.submitterFormValues = value[0];
    }
    else if(value[1] === 'publisher'){
      this.publisherFormValues = value[0];
    }
    else if(value[1] === 'johAdmin'){
      this.johAdminFormValues = value[0];
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
    this.userForm.controls['options'].valueChanges.subscribe(optionValue => {
      this.hideManageRecordsSubmitter = optionValue !== 'submitToFinance';
      this.hideManageRecordsPublisher = optionValue !== 'publishRecords';
      this.hideManageRecordsJohAdmin = optionValue !== 'viewManageJudicialInfo';
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
    }
    
    if (isAdmin) {
      workflows['manageSittingRecords'] = this.adminWorkflow;
    }
  
    workflows['publishRecords'] = this.publisherWorkflow;
  
    const selectedWorkflow = workflows[optionValue];
  
    if (selectedWorkflow) {
      selectedWorkflow.setUserLandingData(this.userForm);
      selectedWorkflow.setLandingVisited();
      
      if (optionValue === 'submitToFinance') {
        selectedWorkflow.setFormData(this.submitterFormValues);
        void this.router.navigate(['sittingRecords', 'submit']);

      }
  
      if (optionValue === 'publishRecords') {
        selectedWorkflow.setFormData(this.publisherFormValues);
      }
  
      if (optionValue === 'manageSittingRecords') {
        void this.router.navigate(['sittingRecords', 'manage']);
      }
    }
  }
  
}
