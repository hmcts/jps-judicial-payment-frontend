import { TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RecorderWorkflowService } from './recorder-workflow.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewSittingRecordResponse } from '../_models/viewSittingRecords.model';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';
import { DateService } from '../_services/date-service/date-service';
import { of } from 'rxjs';
import { SittingRecord } from '../_models/sittingRecord.model';

describe('RecorderWorkflowService', () => {
  let mockWorkflowService: RecorderWorkflowService;
  let mockViewSittingRecordService: ViewSittingRecordService;
  let mockformData: FormGroup;
  let mockDateSvc: DateService
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecorderWorkflowService, ViewSittingRecordService, DateService],
      imports: [HttpClientModule]
    });

    mockWorkflowService = TestBed.inject(RecorderWorkflowService);
    mockViewSittingRecordService = TestBed.inject(ViewSittingRecordService);
    mockDateSvc = TestBed.inject(DateService);
    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: [{ serivce: 'Tribunal 1',hmctsServiceCode: '1234' }],
      venue: ['Venue 1'],
    });

    mockWorkflowService.setFormData(mockformData);
  });

  it('should be created', () => {
    expect(mockWorkflowService).toBeTruthy();
  });

  describe('setManageVisited', () => {
    it('should set hasVisitedManage to true', () => {
      mockWorkflowService.setManageVisited();
      expect(mockWorkflowService.getManageVisited()).toBe(true);
    });
  });

  describe('setFormData and getFormData', () => {
    it('should set and get the form data', () => {
      expect(mockWorkflowService.getFormData()).toBe(mockformData);
    });
  });

  describe('getHmctsServiceCode', () => {
    it('should return the service code on getHmctsServiceCode', () => {
      expect(mockWorkflowService.getHmctsServiceCode()).toEqual('1234')
    })
  })

  describe('delete functions', () => {
    it('should set sittingRecordToDelete to undefined on resetSittingRecordToDelete', () => {
      mockWorkflowService.setSittingRecordToDelete(mockRecord)
      expect(mockWorkflowService.getSittingRecordToDelete()).toEqual(mockRecord)
      mockWorkflowService.resetSittingRecordToDelete()
      expect(mockWorkflowService.sittingRecordToDelete).toBe(undefined)

    })
  })

  describe('checkCameFromConfirm', () => {
    it('should return cameFromConfirm on checkCameFromConfirm', () => {
      expect(mockWorkflowService.checkCameFromConfirm()).toBe(mockWorkflowService.cameFromConfirm)
    })
  })

  describe('sittingRecordRoleList', () => {
    it('should set sittingRecordsRoleList to undefined on resetSittingRecordsRoleList', () => {
      mockWorkflowService.sittingRecordsRoleList = ['1', '2', '3']
      expect(mockWorkflowService.sittingRecordsRoleList).toEqual(['1', '2', '3'])
      mockWorkflowService.resetSittingRecordsRoleList()
      expect(mockWorkflowService.sittingRecordsRoleList).toBe(undefined)
    })
  })

  describe('resetFormData', () => {
    it('should reset the form data', () => {
      expect(mockWorkflowService.getFormData()).toBe(mockformData);
      mockWorkflowService.resetFormData();
      expect(mockWorkflowService.getFormData().getRawValue()).toEqual({ dateSelected: null, tribunalService: null, venue: null });
    });
  });

  describe('resetVisitedManaged', () => {
    it('should set hasVisitedManaged to false', () => {
      mockWorkflowService.setManageVisited()
      mockWorkflowService.resetVisitedManaged()
      expect(mockWorkflowService.getManageVisited()).toBe(false);
    });
  });

  describe('formAndPostNewSittingRecord', () => {
    it('should create a new sitting record post body, and set AM', () => {
      const postFormData = new FormGroup({
        JOH: new FormControl([
          { johRole: {appointment : "President of Tribunal", appointment_type : "Salaried"}, johName: 'name1' },
          { johRole: {appointment : "Regional Tribunal Judge", appointment_type : "Salaried"}, johName: 'name2' }
        ]),
        period: new FormControl('am')
      });
  
      const formDataMock: FormGroup = new FormBuilder().group({
        dateSelected: ['2022-01-01'],
        tribunalService: ['Tribunal 1'],
        venue: ['Venue 1'],
      });
  
      mockWorkflowService.setFormData(formDataMock)
      mockWorkflowService.setAddSittingRecords(postFormData);
  
      mockWorkflowService.setAddSittingRecords(postFormData)
      mockWorkflowService.formAndPostNewSittingRecord();
  

    });

    it('should create a new sitting record post body, and set PM', () => {
      const postFormData = new FormGroup({
        JOH: new FormControl([
          { johRole: {appointment : "President of Tribunal", appointment_type : "Salaried"}, johName: 'name1' },
          { johRole: {appointment : "Regional Tribunal Judge", appointment_type : "Salaried"}, johName: 'name2' }
        ]),
        period: new FormControl('pm')
      });
  
      const formDataMock: FormGroup = new FormBuilder().group({
        dateSelected: ['2022-01-01'],
        tribunalService: ['Tribunal 1'],
        venue: ['Venue 1'],
      });
  
      mockWorkflowService.setFormData(formDataMock)
      mockWorkflowService.setAddSittingRecords(postFormData)
  

      mockWorkflowService.setAddSittingRecords(postFormData)
      mockWorkflowService.formAndPostNewSittingRecord();
  

    });

    it('should create a new sitting record post body, and set both', () => {
      const postFormData = new FormGroup({
        JOH: new FormControl([
          { johRole: {appointment : "President of Tribunal", appointment_type : "Salaried"}, johName: 'name1' },
          { johRole: {appointment : "Regional Tribunal Judge", appointment_type : "Salaried"}, johName: 'name2' }
        ]),
        period: new FormControl('both')
      });
  
      const formDataMock: FormGroup = new FormBuilder().group({
        dateSelected: ['2022-01-01'],
        tribunalService: ['Tribunal 1'],
        venue: ['Venue 1'],
      });
  
      mockWorkflowService.setFormData(formDataMock)
      mockWorkflowService.setAddSittingRecords(postFormData)
  
  
      mockWorkflowService.setAddSittingRecords(postFormData)
      mockWorkflowService.formAndPostNewSittingRecord();


    });
  });
  describe('getSittingRecordsData', () => {
    it('should return a valid ViewSittingRecordResponse object', () => {
      const mockResponse: ViewSittingRecordResponse = { "sittingRecords": [] };
      const dateSelected = '2022-01-01';

      spyOn(mockDateSvc,'formatDateFromForm').and.returnValue(dateSelected);
      spyOn(mockViewSittingRecordService,'postObject').and.returnValue(of(mockResponse))
  
      mockWorkflowService.getSittingRecordsData().subscribe(response => expect(response).toEqual(mockResponse));
    });
  });
  
});

const mockRecord: SittingRecord = {
  am: true,
  changedByUserId: '',
  changedByUserName: '',
  changedDateTime: '',
  contractTypeId: 1,
  createdByUserId: '',
  createdByUserName: '',
  createdDateTime: '',
  epimmsId: '',
  hmctsServiceId: '',
  judgeRoleTypeId: '',
  personalCode: '',
  personalName: '',
  pm: true,
  regionId: '',
  regionName: '',
  statusId: '',
  venueName: '',
  accountCode: '',
  contractTypeName: null,
  crownServantFlag: false,
  fee: null,
  judgeRoleTypeName: null,
  londonFlag: false,
  payrollId: null,
  sittingDate: '',
  sittingRecordId: 0
}