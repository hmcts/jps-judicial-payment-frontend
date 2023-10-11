import { Injectable } from '@angular/core';
import { SubmitterWorkflowService } from './submitter-workflow.service';
import { UserInfoService } from '../_services/user-info-service/user-info-service';
import { PublisherWorkflowService } from './publisher-workflow.service';
import { AdminWorkflowService } from './admin-workflow.service';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LandingWorkflowService {

    constructor(
        private submitterWorkflow: SubmitterWorkflowService,
        private adminWorkflow: AdminWorkflowService,
        private publisherWorkflow: PublisherWorkflowService,
        private userInfoSvc: UserInfoService
    ){}
    
    setupWorkflows(optionValue, userForm, submitterFormValues, publisherFormValues, johAdminFormValues): Observable<null> {
    
        const userRole = this.userInfoSvc.getUserRole();
    
        const isSubmitter = userRole.indexOf('jps-submitter') !== -1;
        const isAdmin = userRole.indexOf('jps-admin') !== -1;
        const isJOHAdmin = userRole.indexOf('jps-JOH-admin') !== -1;
    
        const workflows: { [key: string]: any } = {};
        if (isSubmitter) {
            workflows['manageSittingRecords'] = this.submitterWorkflow;
            workflows['submitToFinance'] = this.submitterWorkflow;
        }
    
        if (isAdmin) {
            workflows['manageSittingRecords'] = this.adminWorkflow;
        }
    
        if (isJOHAdmin) {
            workflows['viewManageJudicialInfo'] = this.adminWorkflow;
        }
    
        workflows['publishRecords'] = this.publisherWorkflow;
    
        const selectedWorkflow = workflows[optionValue];
    
        if (selectedWorkflow) {
            selectedWorkflow.setUserLandingData(userForm);
            selectedWorkflow.setLandingVisited();
    
            if (optionValue === 'submitToFinance') {
                selectedWorkflow.setFormData(submitterFormValues);
    
            }
    
            if (optionValue === 'publishRecords') {
                selectedWorkflow.setFormData(publisherFormValues);
            }
    
            if (optionValue === 'manageSittingRecords') {
                //
            }
    
            if (optionValue === 'viewManageJudicialInfo') {
                selectedWorkflow.setFormData(johAdminFormValues)
            }
        }
    
        return of();
    
    }

}
