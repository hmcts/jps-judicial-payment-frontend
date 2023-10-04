import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../_models/user.model';
import { AdminWorkflowService } from 'src/app/_workflows/admin-workflow.service';

@Component({
  selector: 'app-payroll-id',
  templateUrl: './payroll-id.component.html',
  styleUrls: ['./payroll-id.component.scss']
})
export class PayrollIdComponent implements OnInit{

  selectedJOH;
  currentAppointment;
  payrollId;
  
  constructor(
    private router: Router,
    private adminWorkflow: AdminWorkflowService
  ){}

  ngOnInit(){
    this.selectedJOH = this.adminWorkflow.getFormData().value['johName'] as UserModel
    this.currentAppointment = this.adminWorkflow.getJohAppointment()
  }

  goBack(){
    this.adminWorkflow.resetJohAppointment()
    this.adminWorkflow.resetCameFromManage()
    this.router.navigate(['sittingRecords', 'joh', 'manage'])
  }

  cancelFlow(){
    this.adminWorkflow.resetJohAppointment()
    this.adminWorkflow.resetCameFromManage()
    this.router.navigate(['sittingRecords', 'home'])
  }

}
