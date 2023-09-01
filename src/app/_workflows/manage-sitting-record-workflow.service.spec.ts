import { TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManageSittingRecordsWorkflowService } from './manage-sitting-record-workflow.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewSittingRecordResponse } from '../_models/viewSittingRecords.model';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';
import { DateService } from '../_services/date-service/date-service';
import { of } from 'rxjs';

describe('RecorderWorkflowService', () => {
  let mockmsrWorkflowService: ManageSittingRecordsWorkflowService;
  let mockViewSittingRecordService: ViewSittingRecordService;
  let mockformData: FormGroup;
  let mockDateSvc: DateService
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageSittingRecordsWorkflowService, ViewSittingRecordService, DateService],
      imports: [HttpClientModule]
    });

    mockmsrWorkflowService = TestBed.inject(ManageSittingRecordsWorkflowService);
    mockViewSittingRecordService = TestBed.inject(ViewSittingRecordService);
    mockDateSvc = TestBed.inject(DateService);
    mockformData= new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      venue: ['Venue 1'],
    });

    mockmsrWorkflowService.setFormData(mockformData);
  });

  it('should be created', () => {
    expect(mockmsrWorkflowService).toBeTruthy();
  });

  describe('setManageVisited', () => {
    it('should set hasVisitedManage to true', () => {
      mockmsrWorkflowService.setManageVisited();
      expect(mockmsrWorkflowService.getManageVisited()).toBe(true);
    });
  });

  describe('setFormData and getFormData', () => {
    it('should set and get the form data', () => {
      expect(mockmsrWorkflowService.getFormData()).toBe(mockformData);
    });
  });

  describe('resetFormData', () => {
    it('should reset the form data', () => {
      expect(mockmsrWorkflowService.getFormData()).toBe(mockformData);
      mockmsrWorkflowService.resetFormData();
      expect(mockmsrWorkflowService.getFormData().getRawValue()).toEqual({ dateSelected: null, tribunalService: null, venue: null });
    });
  });

  describe('getSittingRecordsData', () => {
    it('should return a valid ViewSittingRecordResponse object', () => {
      const mockResponse: ViewSittingRecordResponse = { "sittingRecords": [] };
      const dateSelected = '2022-01-01';

      spyOn(mockDateSvc,'formatDateFromForm').and.returnValue(dateSelected);
      spyOn(mockViewSittingRecordService,'postObject').and.returnValue(of(mockResponse))
  
      mockmsrWorkflowService.getSittingRecordsData().subscribe(response => expect(response).toEqual(mockResponse));
    });
  });
  
});