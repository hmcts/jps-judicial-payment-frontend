import { Component, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { Router } from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  AbstractControl
} from '@angular/forms';
import { sittingRecordsPostObj } from '../../_models/addSIttingRecords'

@Component({
  selector: 'app-add-sitting-record',
  templateUrl: './add-sitting-record.component.html',
  styleUrls: ['./add-sitting-record.component.scss']
})
export class AddSittingRecordComponent implements OnInit{

  tribService = "";
  venue = "";
  date = "";

  johList: sittingRecordsPostObj[] = [new sittingRecordsPostObj()];

  goBack(){
    this.router.navigate(['sittingRecords','view'])
  }

  addNewJoh(){
    if(this.johList.length != 3){
      const newJoh = new sittingRecordsPostObj()
      this.johList.push(newJoh);
    }
  }

  removeJoh(index: number){
    this.johList.splice(index, 1)
  }

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router,
    private formBuilder: FormBuilder,
    ){}

  ngOnInit(){
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venue = venue;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
  }

}
