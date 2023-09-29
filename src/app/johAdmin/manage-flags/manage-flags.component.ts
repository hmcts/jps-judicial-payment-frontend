import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../_models/user.model';
import { AdminWorkflowService } from 'src/app/_workflows/admin-workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-flags',
  templateUrl: './manage-flags.component.html',
  styleUrls: ['./manage-flags.component.scss']
})
export class ManageFlagsComponent implements OnInit{
  
  selectedJOH!: UserModel;

  constructor(
    private adminWorkflow: AdminWorkflowService,
    private router: Router
  ){}

  ngOnInit(){
    this.selectedJOH = this.adminWorkflow.getFormData().value['johName'] as UserModel
  }

  cancelFlow(){
    this.router.navigate(['sittingRecords', 'home'])
  }

  goBack(){
    this.router.navigate(['sittingRecords', 'manageJudicial'])
  }

}
