import { TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RecorderWorkflowService } from './recorder-workflow.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewSittingRecordPost, ViewSittingRecordResponse } from '../_models/viewSittingRecords.model';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';
import { DateService } from '../_services/date-service/date-service';
import { of } from 'rxjs';

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
      tribunalService: ['Tribunal 1'],
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
        statusId: ''
      };
      const mockResponse: ViewSittingRecordResponse = { "sittingRecords": [] };
      const dateSelected = '2022-01-01';

      spyOn(mockDateSvc,'formatDateFromForm').and.returnValue(dateSelected);
      spyOn(mockViewSittingRecordService,'postObject').and.returnValue(of(mockResponse))
  
      mockWorkflowService.getSittingRecordsData().subscribe(response => expect(response).toEqual(mockResponse));
    });
  });
  
});
