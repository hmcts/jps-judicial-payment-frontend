import { Component, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, filter, mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../../_services/user-service/user.service'

@Component({
  selector: 'app-add-sitting-record',
  templateUrl: './add-sitting-record.component.html',
  styleUrls: ['./add-sitting-record.component.scss'],
})
export class AddSittingRecordComponent implements OnInit {

  addSittingRecordsFG: FormGroup;

  tribService = "";
  venue = "";
  date = "";
  venueEpims: any;
  userList: any[] = [[], [], []];
  searchTerm = [];

  goBack() {
    this.router.navigate(['sittingRecords', 'view'])
  }

  get johFormArray() {
    return <FormArray>this.addSittingRecordsFG.get('JOH');
  }

  submitNewSittingRecord() {

    this.srWorkFlow.formAndPostNewSittingRecord(this.addSittingRecordsFG, () =>{
      this.router.navigate(['sittingRecords', 'addSuccess'])
    })

  }

  addNewJoh() {
    if (this.johFormArray.length != 3) {
      this.johFormArray.push(
        new FormGroup({
          johName: new FormControl(null, [Validators.required]),
          johRole: new FormControl(null, [Validators.required])
        })
      )

        this.createValueChangesListener(this.johFormArray.length-1)

    }
  }

  onSelectionChange(user, index){
    this.johFormArray.controls[index].get('johName')?.setValue(user)
    this.userList[index] = []
  }

  createValueChangesListener(index) {
    this.johFormArray.controls[index].get('johName')?.valueChanges
      .pipe(
          filter(value => value.length >= 3),
          debounceTime(500),
          mergeMap(value => this.getUsers(value))
      ).subscribe(users => {
        this.userList[index] = users;
        console.log(this.userList)
      })
  }

  public showUserName(value) {
    if(value) { 
      return value.fullName; 
    }
    return ""
  }

  getUsers(searchString){
    return this.userSvc.getUsers(searchString, this.venueEpims)
  }

  removeJoh(index: number) {
    this.johFormArray.removeAt(index)
  }

  constructor(
    public srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    public router: Router,
    private http: HttpClient,
    private userSvc: UserService
  ) {

    this.addSittingRecordsFG = new FormGroup(
      {
        JOH: new FormArray([
          new FormGroup({
            johName: new FormControl(null, [Validators.required]),
            johRole: new FormControl(null, [Validators.required])
          })
        ]),
        period: new FormControl(null, [Validators.required]),
      }
    );
    
    this.createValueChangesListener(0);
  }

  ngOnInit() {
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venue = venue.court_name;
    this.venueEpims = venue.epimms_id;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
  }

}
