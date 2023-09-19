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
import { catchError, debounceTime, filter, mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../../_services/user-service/user.service'
import { UserModel } from '../../_models/user.model';
import { AutoCompleteValidator } from '../../_validators/autoCompleteValidator/auto-complete-validator'
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RolesModel } from '../../_models/roles.model'

@Component({
  selector: 'app-add-sitting-record',
  templateUrl: './add-sitting-record.component.html',
  styleUrls: ['./add-sitting-record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddSittingRecordComponent implements OnInit, OnDestroy {

  addSittingRecordsFG: FormGroup;
  MAX_JOH_COUNT = 3;
  tribService = "";
  venueSiteName = "";
  date = "";
  venueEpimmsId = "";
  userList: any[] = [[] as UserModel[], [] as UserModel[], [] as UserModel[]];
  userRoleList: any[] = [[] as RolesModel[], [] as RolesModel[], [] as RolesModel[]];
  userPersonalCode: Array<string> = ["", "", ""]
  searchTerm = ["", "", ""];
  usersFound = [true, true, true]
  subscriptions: Subscription[] = [];
  serviceCode = "";
  

  goBack() {
    this.srWorkFlow.resetCameFromConfirm()
    void this.router.navigate(['sittingRecords', 'manage'])
  }

  get johFormArray(): FormArray {
    return this.addSittingRecordsFG?.controls['JOH'] as FormArray;
  }

  submitNewSittingRecord() {
    this.srWorkFlow.setAddSittingRecords(this.addSittingRecordsFG)
    this.srWorkFlow.setSittingRecordsRoleList(this.userRoleList)
    void this.router.navigate(['sittingRecords', 'addConfirm'])
  }

  /**
   *
   *  Function to create a new JOH in JOH form array
   * 
   * @return {*}  {FormGroup}
   * @memberof AddSittingRecordComponent
   */
  createJohFormGroup(): FormGroup {
    return new FormGroup({
      johName: new FormControl(null, [Validators.required, AutoCompleteValidator.requireSelection]),
      johRole: new FormControl({ value: null, disabled: true }, [Validators.required])
    });
  }

  /**
   *
   * Function to create the JOH array using createJohFormGroup 
   * and create event listener for newly created JOH
   *
   * @memberof AddSittingRecordComponent
   */
  addNewJoh() {
    if (this.johFormArray.length != this.MAX_JOH_COUNT) {
      this.johFormArray.push(this.createJohFormGroup());
      this.createValueChangesListener(this.johFormArray.length - 1)
    }
  }

  /**
   *
   *  Function to get the user roles based on the user selecting a JOH from the autoComplete
   * 
   * @param {MatAutocompleteSelectedEvent} event
   * @param {number} index  - index of the JOH element in array the user is editing
   * @memberof AddSittingRecordComponent
   */
  optionSelected(event: MatAutocompleteSelectedEvent, index: number) {
    const user = event.option.value as UserModel
    this.johFormArray.controls[index].get('johName')?.setValue(user)
    this.userList[index] = [] as UserModel[]
    this.userPersonalCode[index] = user.personalCode;
    this.getUserRoles(user.personalCode, index)
  }

  /**
   *
   * Dynamically generate the required event listeners to make autocompletes functional 
   *
   * @param {number} index - index in array of the JOH that needs to have eventListener added
   * @memberof AddSittingRecordComponent
   */
  createValueChangesListener(index: number) {
    const subscription = this.johFormArray.controls[index].get('johName')?.valueChanges
      .pipe(
        tap(() => {
          this.johFormArray.controls[index].get('johRole')?.reset();
          this.johFormArray.controls[index].get('johRole')?.disable();
        }),
        tap(() => this.userPersonalCode[index] = ""),
        tap(() => this.usersFound[index] = true),
        tap(() => this.userList[index] = [] as UserModel[]),
        tap(term => this.searchTerm[index] = term),
        filter(value => value.length >= 3),
        debounceTime(500),
        mergeMap(value => this.getUsers(value).pipe(
          catchError(() => {
            return [];
          })
        )),
        
      )
      .subscribe({
        next: (users) => {
          this.changeDetector.markForCheck();
          const filteredUsers = users.filter(user => !this.userPersonalCode.includes(user.personalCode));
          this.userList[index] = filteredUsers;
          if (filteredUsers.length === 0) {
            this.usersFound[index] = false;
          }
        }
      });
  
    this.subscriptions.push(subscription as Subscription)
  }
  /**
   *
   * Used to display only the users full name on selection in auto complete
   *
   * @param {UserModel} value - user object returned from refData call
   * @return {*} 
   * @memberof AddSittingRecordComponent
   */
  public showUserName(value: UserModel) {
    if (value) {
      return value.fullName;
    }
    return ""
  }

  /**
   *
   * Function to make the refdata call to get users roles 
   *
   * @param {string} userPersonalCode - personal code 
   * @param {number} index - index of the JOH to store the roles against
   * @memberof AddSittingRecordComponent
   */
  getUserRoles(userPersonalCode: string, index: number) {
    this.userSvc.getUserInfo(userPersonalCode)
      .subscribe({
        next: (userRoleInfo) => {
        const appointments = userRoleInfo[0].appointments;
        const rolesArray: RolesModel[] = appointments.map((appointment) => {
          const roleObject: RolesModel = {
            appointment: appointment.appointment,
            appointment_type: appointment.appointment_type
          }
          return roleObject
        })
        this.userRoleList[index] = rolesArray;
      },
      complete: () => {
        this.johFormArray.controls[index].get('johRole')?.enable()
        this.changeDetector.markForCheck()
      }
    })
  }

  /**
   *
   * Function to make the refdata call to search for users matching user input string
   *
   * @param {string} searchString - partial search string passed into refdata call 
   * @return {*}  {Observable<UserModel[]>}
   * @memberof AddSittingRecordComponent
   */
  getUsers(searchString: string): Observable<UserModel[]> {
    return this.userSvc.getUsers(searchString, this.serviceCode, this.venueEpimmsId)
  }

  /**
   *
   * function to remove the JOH from the form array and delete the eventListener assigned to form controls
   *
   * @param {number} index - index of JOH 
   * @memberof AddSittingRecordComponent
   */
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
          this.createJohFormGroup()
        ]),
        period: new FormControl(null, [Validators.required]),
      }
    );

    this.createValueChangesListener(0);
  }

  ngOnInit() {
    const formData = this.srWorkFlow.getFormData().value;
    const { tribunalService, venue } = formData;
    this.serviceCode = tribunalService.hmctsServiceCode;
    this.venueEpimmsId = venue.epimms_id;

    if (this.srWorkFlow.getAddSittingRecords() && this.srWorkFlow.checkCameFromConfirm()) {
      this.addSittingRecordsFG = this.srWorkFlow.getAddSittingRecords();
      this.userRoleList = this.srWorkFlow.getSittingRecordsRoleList()
      for (let i = 0; i < this.johFormArray.length; i++) {
        this.createValueChangesListener(i);
        this.userPersonalCode[i] = this.johFormArray.value[i]['johName']['personalCode']
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
