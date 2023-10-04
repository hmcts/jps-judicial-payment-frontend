import { Component, OnInit } from '@angular/core';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { UserModel } from '../../_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flags-success',
  templateUrl: './flags-success.component.html',
  styleUrls: ['./flags-success.component.scss']
})
export class FlagsSuccessComponent implements OnInit{

  selectedJOH;
  flagOptions;

  constructor(
    private adminWorkflow: AdminWorkflowService,
    private router: Router
  ){}

  ngOnInit() {
    this.selectedJOH = this.adminWorkflow.getFormData().value['johName'] as UserModel
    this.flagOptions = this.adminWorkflow.getFlagValues()
  }

  navigateToManage(){
    this.adminWorkflow.resetCameFromManage()
    this.router.navigate(['sittingRecords', 'home'])
  }

  navigateToFlags(){
    this.router.navigate(['sittingRecords', 'joh', 'manage'])
  }
  
}
