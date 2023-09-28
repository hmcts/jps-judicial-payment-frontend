import { Component, OnInit } from '@angular/core';
import { UserInfoModel, UserModel } from '../../_models/user.model';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';

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
  ){
    this.userInfo = this.adminWorkflow.getUserInfo();
  }

  ngOnInit(){
    this.selectedJOH = this.adminWorkflow.getFormData().value['johName'] as UserModel
    this.selectedTribService = this.adminWorkflow.getFormData().value['tribunalService'];
  }

}
