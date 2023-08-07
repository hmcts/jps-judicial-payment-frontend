import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SittingRecordWorkflowService } from './sitting-record-workflow.service';
import { ViewSittingRecordPost, ViewSittingRecordResponse } from '../_models/viewSittingRecords.model';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';
import { DateService } from '../_services/date-service/date-service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SittingRecordWorkflowService', () => {
  let mockSRWorkflowService: SittingRecordWorkflowService;
  let mockViewSittingRecordService: ViewSittingRecordService;
  let mockformData: FormGroup;
  let mockDateSvc: DateService
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SittingRecordWorkflowService, ViewSittingRecordService, DateService],
      imports: [HttpClientTestingModule]
    });

    mockSRWorkflowService = TestBed.inject(SittingRecordWorkflowService);
    mockViewSittingRecordService = TestBed.inject(ViewSittingRecordService);
    mockDateSvc = TestBed.inject(DateService);
    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    mockSRWorkflowService.setFormData(mockformData);
  });

  it('should be created', () => {
    expect(mockSRWorkflowService).toBeTruthy();
  });

  describe('setManageVisited', () => {
    it('should set hasVisitedManage to true', () => {
      mockSRWorkflowService.setManageVisited();
      expect(mockSRWorkflowService.getManageVisited()).toBe(true);
    });
  });

  describe('setFormData and getFormData', () => {
    it('should set and get the form data', () => {
      expect(mockSRWorkflowService.getFormData()).toBe(mockformData);
    });
  });

  describe('resetFormData', () => {
    it('should reset the form data', () => {
      expect(mockSRWorkflowService.getFormData()).toBe(mockformData);
      mockSRWorkflowService.resetFormData();
      expect(mockSRWorkflowService.getFormData().getRawValue()).toEqual({ dateSelected: null, tribunalService: null, venue: null });
    });
  });

  describe('resetVisitedManaged', () => {
    it('should set hasVisitedManaged to false', () => {
      mockSRWorkflowService.setManageVisited()
      mockSRWorkflowService.resetVisitedManaged()
      expect(mockSRWorkflowService.getManageVisited()).toBe(false);
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
  
      mockSRWorkflowService.setFormData(formDataMock)
      mockSRWorkflowService.setAddSittingRecords(postFormData);
  
      mockSRWorkflowService.setAddSittingRecords(postFormData)
      mockSRWorkflowService.formAndPostNewSittingRecord();
  

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
  
      mockSRWorkflowService.setFormData(formDataMock)
      mockSRWorkflowService.setAddSittingRecords(postFormData)
  

      mockSRWorkflowService.setAddSittingRecords(postFormData)
      mockSRWorkflowService.formAndPostNewSittingRecord();
  

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
  
      mockSRWorkflowService.setFormData(formDataMock)
      mockSRWorkflowService.setAddSittingRecords(postFormData)
  
  
      mockSRWorkflowService.setAddSittingRecords(postFormData)
      mockSRWorkflowService.formAndPostNewSittingRecord();


    });
  });
  describe('getSittingRecordsData', () => {
    it('should return a valid ViewSittingRecordResponse object', () => {
      const postObj: ViewSittingRecordPost = {
        pageSize: 100,
        offset: 0,
        dateOrder: 'ASCENDING',
        regionId: '',
        epimmsId: '',
        createdByUserId: '',
        personalCode: '',
        judgeRoleTypeId: '',
        duration: '',
        dateRangeFrom: '',
        dateRangeTo: '',
        statusIds: []
      };
      const mockResponse: ViewSittingRecordResponse = { "sittingRecords": [] };
      const dateSelected = '2022-01-01';

      spyOn(mockDateSvc,'formatDateFromForm').and.returnValue(dateSelected);
      spyOn(mockViewSittingRecordService,'postObject').and.returnValue(of(mockResponse))
  
      mockSRWorkflowService.getSittingRecordsData().subscribe(response => expect(response).toEqual(mockResponse));
    });
  });
  
});
