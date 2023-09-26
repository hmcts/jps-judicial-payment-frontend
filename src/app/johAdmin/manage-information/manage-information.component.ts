import { Component, OnInit } from '@angular/core';
import { UserInfoModel, UserModel } from '../../_models/user.model';
import { UserService } from '../../_services/user-service/user.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';

@Component({
  selector: 'app-manage-information',
  templateUrl: './manage-information.component.html',
  styleUrls: ['./manage-information.component.scss']
})
export class ManageInformationComponent implements OnInit{

  selectedJOH!: UserModel;
  userInfo!: UserInfoModel;

  constructor(
    private adminWorkflow: AdminWorkflowService,
    private userSvc: UserService
  ){
    this.userInfo = this.adminWorkflow.getUserInfo();
    console.log(this.userInfo)
  }

  ngOnInit(){
    this.selectedJOH = this.adminWorkflow.getFormData().value['johName'] as UserModel
  }

}
