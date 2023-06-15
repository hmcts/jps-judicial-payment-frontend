import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { UserInfoModel, UserModel } from '../../_models/user.model';
import { AutoCompleteValidator } from '../../_validators/autoCompleteValidator/auto-complete-validator'
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-sitting-record',
  templateUrl: './add-sitting-record.component.html',
  styleUrls: ['./add-sitting-record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddSittingRecordComponent implements OnInit, OnDestroy {

  addSittingRecordsFG: FormGroup;

  tribService = "";
  venueSiteName = "";
  date = "";
  venueEpimmsId = "";
  userList: any[] = [ [] as UserModel[], [] as UserModel[], [] as UserModel[]];
  userRoleList: any[] = [ {} as UserInfoModel, {} as UserInfoModel[], {} as UserInfoModel ];
  searchTerm = [ "", "", "" ];
  usersFound = [ true, true, true ]
  subscriptions: Subscription[] = [];

  goBack() {
    void this.router.navigate(['sittingRecords', 'manage'])
  }

  get johFormArray(): FormArray {
    return this.addSittingRecordsFG?.controls['JOH'] as FormArray;
  }

  submitNewSittingRecord() {
    this.srWorkFlow.setAddSittingRecords(this.addSittingRecordsFG)
    void this.router.navigate(['sittingRecords', 'addConfirm'])
  }

  addNewJoh() {
    if (this.johFormArray.length != 3) {
      this.johFormArray.push(
        new FormGroup({
          johName: new FormControl(null, [Validators.required, AutoCompleteValidator.requireSelection]),
          johRole: new FormControl(null, [Validators.required])
        })
      )

      this.createValueChangesListener(this.johFormArray.length-1)
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent, index: number){
    const user = event.option.value as UserModel
    this.johFormArray.controls[index].get('johName')?.setValue(user)
    this.userList[index] = [] as UserModel[]
    this.getUserRoles(user.personalCode, index)
  }

  createValueChangesListener(index: number) {
    const subscription = this.johFormArray.controls[index].get('johName')?.valueChanges
      .pipe(
          tap(() => this.usersFound[index] = true),
          tap(() => this.userList[index] = [] as UserModel[]),
          tap(term => this.searchTerm[index] = term),
          filter(value => value.length >= 3),
          debounceTime(500),
          mergeMap(value => this.getUsers(value))
      ).subscribe(users => {
        this.changeDetector.markForCheck()
        this.userList[index] = users;
        if(users.length === 0){
          this.usersFound[index] = false
        }
      })

    this.subscriptions.push(subscription as Subscription)
  }

  public showUserName(value: UserModel) {
    if(value) { 
      return value.fullName; 
    }
    return ""
  }

  getUserRoles(userPersonalCode: string, index: number){
    this.userSvc.getUserInfo(userPersonalCode)
    .subscribe(userRoleInfo => {
      this.userRoleList[index] = userRoleInfo;
    })
  }

  getUsers(searchString: string): Observable<UserModel[]>{
    return this.userSvc.getUsers(searchString, this.venueEpimmsId)
  }

  removeJoh(index: number) {
    this.johFormArray.removeAt(index)
    this.subscriptions[index].unsubscribe();
  }

  constructor(
    public srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    public router: Router,
    private http: HttpClient,
    private userSvc: UserService,
    private changeDetector: ChangeDetectorRef
  ) {

    this.addSittingRecordsFG = new FormGroup(
      {
        JOH: new FormArray([
          new FormGroup({
            johName: new FormControl(null, [Validators.required, AutoCompleteValidator.requireSelection]),
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
    this.venueSiteName = venue.site_name;
    this.venueEpimmsId = venue.epimms_id;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);

    if(this.srWorkFlow.getAddSittingRecords() && this.srWorkFlow.checkCameFromConfirm()){
      this.addSittingRecordsFG = this.srWorkFlow.getAddSittingRecords();
        
      for(let i = 0; i < this.johFormArray.length; i++){
        this.createValueChangesListener(i);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
