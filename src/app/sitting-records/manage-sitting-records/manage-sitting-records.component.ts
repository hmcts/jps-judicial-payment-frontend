import { Component, OnInit} from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../_validators/sitting-records-form-validator';
import { SharedWorkflowService } from '../../_workflows/shared-workflow.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-sitting-records',
  templateUrl: './manage-sitting-records.component.html',
  styleUrls: ['./manage-sitting-records.component.scss']
})
export class ManageSittingRecordsComponent implements OnInit {
  manageRecords: FormGroup;
  showPreviousButton = true;
  
  constructor(
    protected router: Router,
    private cookies: CookieService,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sharedWorkFlowService: SharedWorkflowService,
  ){
    this.manageRecords = this.formBuilder.group(
      {
        tribunalService: new FormControl('', Validators.required),
        venue: new FormControl('', [Validators.required, CustomValidators.requireVenueMatch]),
        dateSelected: this.formBuilder.group({
          dateDay: ['', [Validators.required,]],
          dateMonth: ['', [Validators.required,]],
          dateYear: ['', [Validators.required,]],
        },{
          validators: [
            CustomValidators.validateDateFormat
          ]
        })
      }
    );

    this.manageRecords.controls['venue'].disable();
    
    this.manageRecords.valueChanges.subscribe(() => {
      if(this.manageRecords.controls['tribunalService'].value !== "" && this.manageRecords.controls['venue'].disabled){
        this.manageRecords.controls['venue'].enable();
      }

    })

    this.manageRecords.controls['tribunalService'].valueChanges.subscribe(() => {
      console.log(this.manageRecords)
      if(this.manageRecords.controls['venue'].value !== ""){
        this.manageRecords.controls['venue'].reset();
      }
    });
    
  }

  ngOnInit(): void {
    if(this.sharedWorkFlowService.getFormData()){
      this.manageRecords = this.sharedWorkFlowService.getFormData();
    }

    const userRole = this.cookies.get('__userrole__');

    if (userRole.indexOf('jps-recorder') != -1)
      this.showPreviousButton = false;
  }

  submitForm(){
    this.sharedWorkFlowService.setFormData(this.manageRecords)
    this.sharedWorkFlowService.setManageVisited()
    void this.router.navigate(['sittingRecords','view'])
  }

  goBack(){
    void this.router.navigate(['sittingRecords','home'])
  }
  
}

