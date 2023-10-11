import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { LandingWorkflowService } from 'src/app/_workflows/landing-workflow.service';
import { UserService } from 'src/app/_services/user-service/user.service';
import { Subject, takeUntil } from 'rxjs';

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

  private destroy$ = new Subject<void>();

  constructor(
    protected router: Router,
    private cookies: CookieService,
    protected activatedRoute: ActivatedRoute,
    private userSvc: UserService,
    private formBuilder: FormBuilder,
    private submitterWorkflow : SubmitterWorkflowService,
    private publisherWorkflow : PublisherWorkflowService,
    private adminWorkflow: AdminWorkflowService,
    private landingWorkflow: LandingWorkflowService

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
    this.userForm.controls['options'].valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(optionValue => {
      this.hideManageRecordsSubmitter = optionValue !== 'submitToFinance';
      this.hideManageRecordsPublisher = optionValue !== 'publishRecords';
      this.hideManageRecordsJohAdmin = optionValue !== 'viewManageJudicialInfo';
    });
  }
  

  submitForm() {
    const optionValue = this.userForm.controls["options"].value;

    this.landingWorkflow.setupWorkflows(optionValue, this.userForm, this.submitterFormValues, this.publisherFormValues, this.johAdminFormValues)
    .subscribe()

    switch(optionValue){

      case "viewManageJudicialInfo":
        this.userSvc.getUserInfo(this.adminWorkflow.getFormData().value['johName']['personalCode'])
        .subscribe({
          next: (userRoleInfo) => {
            this.adminWorkflow.setUserInfo(userRoleInfo[0])
            void this.router.navigate(['sittingRecords', 'manageJudicial'])
          }
        });
        break;
      case "submitToFinance": 
        void this.router.navigate(['sittingRecords', 'submit']);
        break;
      case "manageSittingRecords":
        void this.router.navigate(['sittingRecords', 'manage']);
        break;


    }

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
