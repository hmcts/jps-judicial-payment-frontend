import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../_models/user.model';
import { AdminWorkflowService } from 'src/app/_workflows/admin-workflow.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JohDateValidator } from '../../_validators/johDataValidator/joh-date-validator'
import { JohService } from 'src/app/_services/joh-service/joh.service';

@Component({
  selector: 'app-manage-flags',
  templateUrl: './manage-flags.component.html',
  styleUrls: ['./manage-flags.component.scss']
})
export class ManageFlagsComponent implements OnInit{

  selectedJOH!: UserModel;
  flagForm!: FormGroup;

  constructor(
    private adminWorkflow: AdminWorkflowService,
    private router: Router,
    private fb: FormBuilder,
    private johService: JohService
  ){
    this.flagForm = this.fb.group(
      {
        londonFlag: [null, Validators.required],
        crownFlag: [null, Validators.required],
        flagDate: this.fb.group({
          flagDay: [null, [Validators.required]],
          flagMonth: [null, [Validators.required]],
          flagYear: [null, [Validators.required]],
        },{
          validators: [
            JohDateValidator.validateJohDate
          ]
        })
      }
    );
  }

  ngOnInit() {
    this.selectedJOH = this.adminWorkflow.getFormData().value['johName'] as UserModel
  }

  get f(): { [key: string]: AbstractControl } {
    return this.flagForm.controls;
  }
  
  continueFlow(){
    const postObj = this.adminWorkflow.createPostObject(this.flagForm.value)
    this.adminWorkflow.setFlagValues(this.flagForm.value)
    this.johService.postJohAttributes(postObj, this.selectedJOH.personalCode)
    .subscribe({
      next: () => {
        //
      },
      error: () => {
        this.router.navigate(['sittingRecords', 'johFlagsSuccess'])
      }
    })
  }

  cancelFlow(){
    this.adminWorkflow.resetFormData();
    this.adminWorkflow.resetCameFromManage()
    this.router.navigate(['sittingRecords', 'home'])
  }

  goBack(){
    this.router.navigate(['sittingRecords', 'manageJudicial'])
  }

}
