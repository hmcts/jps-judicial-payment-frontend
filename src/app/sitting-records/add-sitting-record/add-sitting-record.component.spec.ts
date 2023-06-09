import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddSittingRecordComponent } from './add-sitting-record.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { UserService } from '../../_services/user-service/user.service';
import { Router } from '@angular/router';

describe('AddSittingRecordComponent', () => {
  let component: AddSittingRecordComponent;
  let fixture: ComponentFixture<AddSittingRecordComponent>;
  let userService: UserService;
  let srWorkflowService: SittingRecordWorkflowService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatAutocompleteModule],
      declarations: [AddSittingRecordComponent],
      providers: [SittingRecordWorkflowService, DateService, UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSittingRecordComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    srWorkflowService = TestBed.inject(SittingRecordWorkflowService);
    srWorkflowService.setManageVisited();
    const formDataMock: FormGroup = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    srWorkflowService.setFormData(formDataMock)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to sittingRecords/manage when goBack() is called', () => {
    spyOn(router, 'navigate');

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
  });

  it('should navigate to sittingRecords/addConfirm when submitNewSittingRecord() is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.submitNewSittingRecord();

    expect(navigateSpy).toHaveBeenCalledWith(['sittingRecords', 'addConfirm']);
  });

  it('should add a new JOH to the form', () => {
    component.addNewJoh()

    const johFormArray = component.addSittingRecordsFG.get('JOH') as FormArray;
    expect(johFormArray.length).toBe(2);
    expect(johFormArray.at(1)).toBeTruthy();
    expect(johFormArray.at(1)).toBeInstanceOf(FormGroup);
    expect(johFormArray.at(1).get('johName')).toBeTruthy();
    expect(johFormArray.at(1).get('johRole')).toBeTruthy();
  });

  it('should remove a JOH from the form', () => {
    component.addNewJoh()
    component.removeJoh(1)

    const johFormArray = component.addSittingRecordsFG.get('JOH') as FormArray;
    expect(johFormArray.length).toBe(1);
  });

  it('should get users from the user service', () => {
    const mockUsers = ['User1', 'User2'];
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));

    const searchString = 'John';
    component.getUsers(searchString).subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    expect(userService.getUsers).toHaveBeenCalledWith(searchString, component.venueEpims);
  });
  
  it('should set JOH name, clear user list, and fetch user roles on optionSelected', () => {
    const mockUser = { personalCode: '12345' };
    const mockUserRoles = ['Role1', 'Role2'];
  
    spyOn(userService, 'getUserInfo').and.returnValue(of(mockUserRoles));
  
    component.optionSelected({ option: { value: mockUser } }, 0);
  
    expect(component.johFormArray.at(0).get('johName')?.value).toEqual(mockUser);
    expect(userService.getUserInfo).toHaveBeenCalledWith(mockUser.personalCode);
    expect(component.userList[0]).toEqual([]);
  });
  
  it('should initialize component properties and set value change listeners for JOH form controls', () => {
    component.ngOnInit();
    srWorkflowService.setAddSittingRecords(component.addSittingRecordsFG)
    srWorkflowService.setCameFromConfirm();
    
    spyOn(srWorkflowService, 'getAddSittingRecords').and.returnValue(component.addSittingRecordsFG);
    spyOn(srWorkflowService, 'checkCameFromConfirm').and.returnValue(true);
  
    const johFormArray = new FormArray([
      new FormGroup({
        johName: new FormControl(),
        johRole: new FormControl()
      })
    ]);
    component.ngOnInit();
  
    for (let i = 0; i < johFormArray.length; i++) {
      expect(component.subscriptions[i]).toBeTruthy();
    }
  });
  

});