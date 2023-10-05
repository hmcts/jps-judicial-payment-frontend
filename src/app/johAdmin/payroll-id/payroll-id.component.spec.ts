import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollIdComponent } from './payroll-id.component';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserModel } from '../../_models/user.model';

describe('PayrollIdComponent', () => {
  let component: PayrollIdComponent;
  let fixture: ComponentFixture<PayrollIdComponent>;
  let adminWorkflow: AdminWorkflowService
  let router: Router

  const mockUserInfo: UserModel = {
    title: "mr",
    knownAs: "john",
    surname: "doe",
    fullName: "john doe",
    emailId: "",
    idamId: "",
    personalCode: "" 
  }
  const johFormData = new FormBuilder().group({
    tribunalService: [{hmctsServiceCode: '1234', service: 'service 1'}],
    johName: [mockUserInfo]
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollIdComponent ]
    })
    .compileComponents();
    adminWorkflow = TestBed.inject(AdminWorkflowService)
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(PayrollIdComponent);
    component = fixture.componentInstance;

    adminWorkflow.setJohAppointment('Tribunal Judge')
    adminWorkflow.setPayrollId('1234')
    adminWorkflow.setCameFromManage()
    adminWorkflow.setFormData(johFormData)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise variables on ngOnInit', () => {
    
    component.ngOnInit()

    expect(component.payrollId).toBe('1234')
    expect(component.selectedJOH).toEqual(mockUserInfo)
    expect(component.currentAppointment).toBe('Tribunal Judge')
  })

  it('should reset all stored values on clearStoredValues', () => {
    expect(adminWorkflow.getJohAppointment()).not.toBeNull()
    expect(adminWorkflow.getCameFromManage()).not.toBeNull()
    expect(adminWorkflow.getPayrollId()).not.toBeNull()

    component.clearStoredValues()

    expect(adminWorkflow.getJohAppointment()).toBeNull()
    expect(adminWorkflow.getCameFromManage()).toBe(false)
    expect(adminWorkflow.getPayrollId()).toBeNull()

  })

  it('should navigate to sittingRecords/joh/manage on goBack', () => {
    spyOn(component, 'clearStoredValues')
    spyOn(router, 'navigate')
    component.goBack()
    expect(component.clearStoredValues).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'joh', 'manage'])
  })

  it('should navigate to sittingRecords/home on cancelFlow', () => {
    spyOn(component, 'clearStoredValues')
    spyOn(router, 'navigate')
    component.cancelFlow()
    expect(component.clearStoredValues).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home'])
  })

});
