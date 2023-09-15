import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AddSittingRecordComponent } from './add-sitting-record.component';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service/date-service';
import { UserService } from '../../_services/user-service/user.service';
import { Router } from '@angular/router';
import { UserModel, UserInfoModel } from '../../_models/user.model';
import { SittingRecordsInfoBannerComponent } from '../sitting-records-info-banner/sitting-records-info-banner.component';

describe('AddSittingRecordComponent', () => {
  let component: AddSittingRecordComponent;
  let fixture: ComponentFixture<AddSittingRecordComponent>;
  let userService: UserService;
  let srWorkflowService: SittingRecordWorkflowService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatAutocompleteModule],
      declarations: [AddSittingRecordComponent, SittingRecordsInfoBannerComponent],
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
    const mockUsers: UserModel[] = [ 
      {
        title: '',
        knownAs: '',
        surname: '',
        fullName: '',
        emailId: '',
        idamId: '',
        personalCode: '' 
      }
    ]
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));

    const searchString = 'John';
    component.serviceCode = 'BBa3'
    component.getUsers(searchString).subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    expect(userService.getUsers).toHaveBeenCalledWith(searchString, component.serviceCode, component.venueEpimmsId);
  });
  
  it('should set JOH name, clear user list, and fetch user roles on optionSelected', () => {
    const mockUser = { personalCode: '12345' };
    const mockUserRoles: UserInfoModel[] = [
      {
        sidam_id: '',
        object_id: '',
        known_as:  '',
        surname:  '',
        full_name:  '',
        post_nominals:  '',
        email_id:  '',
        personal_code:  '',
        appointments: [
          {
            base_location_id:  '',
            epimms_id:  '',
            court_name:  '',
            cft_region_id:  '',
            cft_region:  '',
            location_id:  '',
            location:  '',
            is_principal_appointment:  '',
            appointment:  '',
            appointment_type:  '',
            service_code:  '',
            roles: [
              '' 
            ],
            start_date:  '',
            end_date:  '' 
          }
        ],
        authorisations: [
          {
            jurisdiction:  '',
            ticket_description:  '',
            ticket_code:  '',
            service_codes: [
              '' 
            ],
            start_date:  '',
            end_date:  '' 
          }
        ]
      }
    ]
  
    const event: MatAutocompleteSelectedEvent = {
      option: {
        value: mockUser
      }
    } as MatAutocompleteSelectedEvent;
    
    spyOn(userService, 'getUserInfo').and.returnValue(of(mockUserRoles));
  
    component.optionSelected(event, 0);
  
    expect(component.johFormArray.at(0).get('johName')?.value).toEqual(mockUser);
    expect(userService.getUserInfo).toHaveBeenCalledWith(mockUser.personalCode);
    expect(component.userList[0]).toEqual([]);
  });
  
  it('should initialize component properties and set value change listeners for JOH form controls', () => {
    const johFormArray = new FormArray([
      new FormGroup({
        johName: new FormControl({ personalCode: '12355' }),
        johRole: new FormControl()
      })
    ]);
    
    const formGroup = new FormGroup({
      JOH: johFormArray
    });
    spyOn(srWorkflowService, 'getAddSittingRecords').and.returnValue(formGroup);
    spyOn(srWorkflowService, 'checkCameFromConfirm').and.returnValue(true);
  
    
    console.log(johFormArray.value)
    component.ngOnInit();
  
    for (let i = 0; i < johFormArray.length; i++) {
      expect(component.subscriptions[i]).toBeTruthy();
    }
  });
  
});