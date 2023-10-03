import { Component, OnInit } from '@angular/core';
import { UserInfoModel, UserModel } from '../../_models/user.model';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-information',
  templateUrl: './manage-information.component.html',
  styleUrls: ['./manage-information.component.scss']
})
export class ManageInformationComponent implements OnInit{

  selectedJOH!: UserModel;
  userInfo!: UserInfoModel;
  selectedTribService!: { hmctsServiceCode: string, service: string };

  constructor(
    private adminWorkflow: AdminWorkflowService,
    private router: Router
  ){
    this.userInfo = this.adminWorkflow.getUserInfo();
  }

  editJohFlags(){
    this.adminWorkflow.setCameFromManage()
    void this.router.navigate(['sittingRecords', 'johFlags'])
  }

  ngOnInit(){
    this.selectedJOH = this.adminWorkflow.getFormData().value['johName'] as UserModel
    this.selectedTribService = this.adminWorkflow.getFormData().value['tribunalService'];
  }

  cancelFlow(){
    this.adminWorkflow.resetFormData();
    this.router.navigate(['sittingRecords', 'home'])
  }

}
