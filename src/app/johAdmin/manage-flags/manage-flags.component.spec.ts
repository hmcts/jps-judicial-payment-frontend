import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlagsComponent } from './manage-flags.component';
import { JohService } from 'src/app/_services/joh-service/joh.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminWorkflowService } from 'src/app/_workflows/admin-workflow.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ManageFlagsComponent', () => {
  let component: ManageFlagsComponent;
  let fixture: ComponentFixture<ManageFlagsComponent>;
  let adminWorkflow: AdminWorkflowService
  let router: Router
  let johService: JohService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFlagsComponent ],
      providers: [ JohService, AdminWorkflowService ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();

    adminWorkflow = TestBed.inject(AdminWorkflowService)
    router = TestBed.inject(Router)
    johService = TestBed.inject(JohService)
    fixture = TestBed.createComponent(ManageFlagsComponent);
    component = fixture.componentInstance;
    
  });

  it('should return the flagForm controls', () => {
    expect(component.f).toEqual(component.flagForm.controls);
  });

  it('should call the adminWorkflow.createPostObject and johService.postJohAttributes methods', () => {
    spyOn(adminWorkflow, 'createPostObject').and.returnValue({
      londonWeightingFlag: true,
      crownServantFlag: true,
      effectiveFromDate: ''
    });
    spyOn(johService, 'postJohAttributes').and.returnValue(of());

    component.selectedJOH = {
      title: '',
      knownAs: '',
      surname: '',
      fullName: '',
      emailId: '',
      idamId: '',
      personalCode: '1234' 
    }

    component.continueFlow();

    expect(adminWorkflow.createPostObject).toHaveBeenCalledWith(component.flagForm.value);
    expect(johService.postJohAttributes).toHaveBeenCalled();
  });

  it('should call the adminWorkflow.resetFormData and router.navigate methods', () => {
    spyOn(adminWorkflow, 'resetFormData').and.stub();
    spyOn(router, 'navigate').and.stub();

    component.cancelFlow();

    expect(adminWorkflow.resetFormData).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
  });

  it('should call the router.navigate method', () => {
    spyOn(router, 'navigate').and.stub();

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'manageJudicial']);
  });
});
