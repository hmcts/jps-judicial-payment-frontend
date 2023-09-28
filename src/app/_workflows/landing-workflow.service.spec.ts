import { TestBed } from '@angular/core/testing';
import { LandingWorkflowService } from './landing-workflow.service';
import { SubmitterWorkflowService } from './submitter-workflow.service';
import { UserInfoService } from '../_services/user-info-service/user-info-service';
import { PublisherWorkflowService } from './publisher-workflow.service';
import { AdminWorkflowService } from './admin-workflow.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LandingWorkflowService', () => {
    let service: LandingWorkflowService;
    let submitterWorkflow: SubmitterWorkflowService;
    let adminWorkflow: AdminWorkflowService;
    let publisherWorkflow: PublisherWorkflowService;
    let userInfoSvc: UserInfoService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LandingWorkflowService,
                SubmitterWorkflowService,
                UserInfoService,
                PublisherWorkflowService,
                AdminWorkflowService,
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(LandingWorkflowService);
        submitterWorkflow = TestBed.inject(SubmitterWorkflowService);
        adminWorkflow = TestBed.inject(AdminWorkflowService);
        publisherWorkflow = TestBed.inject(PublisherWorkflowService);
        userInfoSvc = TestBed.inject(UserInfoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should setup workflows correctly', () => {
        
        const optionValue = 'submitToFinance';
        const userForm = new FormBuilder().group(
            {
                options: [null],
            });
        const submitterFormValues = new FormBuilder().group({
            tribunalService: [null],
            region: [null],
            dateSelected: new FormBuilder().group({
                dateDay: [null],
                dateMonth: [null],
                dateYear: [null],
            })
        });
        const publisherFormValues = new FormBuilder().group({
            tribunalService: [null,],
            dateSelected: new FormBuilder().group({
                dateDay: [null],
                dateMonth: [null],
                dateYear: [null],
            })
        });
        const johAdminFormValues = new FormBuilder().group({
            tribunalService: [null, ],
            johName: [{value: '', disabled: true}]
        });

        spyOn(userInfoSvc, 'getUserRole').and.returnValue('jps-submitter');
        spyOn(submitterWorkflow, 'setUserLandingData');
        spyOn(submitterWorkflow, 'setLandingVisited');
        spyOn(submitterWorkflow, 'setFormData');
        service.setupWorkflows(optionValue, userForm, submitterFormValues, publisherFormValues, johAdminFormValues);
        

        expect(submitterWorkflow.setUserLandingData).toHaveBeenCalledWith(userForm);
        expect(submitterWorkflow.setLandingVisited).toHaveBeenCalled();
        expect(submitterWorkflow.setFormData).toHaveBeenCalledWith(submitterFormValues);

    });

    it('should setup workflows correctly', () => {
        
        const optionValue = 'viewManageJudicialInfo';
        const userForm = new FormBuilder().group(
            {
                options: [null],
            });
        const submitterFormValues = new FormBuilder().group({
            tribunalService: [null],
            region: [null],
            dateSelected: new FormBuilder().group({
                dateDay: [null],
                dateMonth: [null],
                dateYear: [null],
            })
        });
        const publisherFormValues = new FormBuilder().group({
            tribunalService: [null,],
            dateSelected: new FormBuilder().group({
                dateDay: [null],
                dateMonth: [null],
                dateYear: [null],
            })
        });
        const johAdminFormValues = new FormBuilder().group({
            tribunalService: [null],
            johName: [{value: '', disabled: true}]
        });

        spyOn(userInfoSvc, 'getUserRole').and.returnValue('jps-JOH-admin');
        spyOn(adminWorkflow, 'setUserLandingData');
        spyOn(adminWorkflow, 'setLandingVisited');
        spyOn(adminWorkflow, 'setFormData');
        service.setupWorkflows(optionValue, userForm, submitterFormValues, publisherFormValues, johAdminFormValues);
        

        expect(adminWorkflow.setUserLandingData).toHaveBeenCalledWith(userForm);
        expect(adminWorkflow.setLandingVisited).toHaveBeenCalled();
        expect(adminWorkflow.setFormData).toHaveBeenCalledWith(johAdminFormValues);
    });

});