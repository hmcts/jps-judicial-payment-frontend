import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { RegionModel } from '../_models/region.model';
import { ViewSittingRecordResponse } from '../_models/viewSittingRecords.model';
import { DateService } from '../_services/date-service/date-service';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';

import { SubmitterWorkflowService } from './submitter-workflow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SubmitterWorkflowService', () => {
  let mockWorkflowService: SubmitterWorkflowService;
  let mockViewSittingRecordService: ViewSittingRecordService;
  let mockformData: FormGroup;
  let mockUserLandingData: FormGroup;
  let mockDateSvc: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmitterWorkflowService, ViewSittingRecordService, DateService],
      imports: [HttpClientTestingModule]
    });
    
    mockWorkflowService = TestBed.inject(SubmitterWorkflowService);
    mockViewSittingRecordService = TestBed.inject(ViewSittingRecordService);
    mockDateSvc = TestBed.inject(DateService);
    mockformData = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      region: ['Region 1'],
    });

    mockUserLandingData = new FormBuilder().group({
      option: ['opt2'],
    });

    mockWorkflowService.setFormData(mockformData);
    mockWorkflowService.setUserLandingData(mockUserLandingData);
  });

  it('should be created', () => {
    expect(mockWorkflowService).toBeTruthy();
  });

  describe('setLandingVisited', () => {
    it('should set hasLandingVisited to true', () => {
      mockWorkflowService.setLandingVisited();
      expect(mockWorkflowService.getLandingVisited()).toBe(true);
    });
  });

  describe('setFormData and getFormData', () => {
    it('should set and get the form data', () => {
      expect(mockWorkflowService.getFormData()).toBe(mockformData);
    });
  });

  describe('setUserLandingData and getUserLandingData', () => {
    it('should set and get the user form data', () => {
      expect(mockWorkflowService.getUserLandingData()).toBe(mockUserLandingData);
    });
  });

  describe('resetFormData', () => {
    it('should reset the form data', () => {
      expect(mockWorkflowService.getFormData()).toBe(mockformData);
      mockWorkflowService.resetFormData();
      expect(mockWorkflowService.getFormData().getRawValue()).toEqual({ dateSelected: null, tribunalService: null, region: null });
    });
  });

  describe('resetUserLandingData', () => {
    it('should reset the user form data', () => {
      expect(mockWorkflowService.getUserLandingData()).toBe(mockUserLandingData);
      mockWorkflowService.resetUserLandingData();
      expect(mockWorkflowService.getUserLandingData().getRawValue()).toEqual({ option: null });
    });
  });

  describe('setFinanceRegions and getFinanceRegions', () => {
    it('should set and get the finance regions', () => {
      const mockRegions: RegionModel[] = [
        {
          region_id: '1',
          description: 'Region 1',
          welsh_region: '',
        },
        {
          region_id: '2',
          description: 'Region 2',
          welsh_region: '',
        }
      ]

      mockWorkflowService.setFinanceRegions(mockRegions);
      expect(mockWorkflowService.getFinanceRegions()).toBe(mockRegions);
    });
  });

  describe('getSittingRecordsData', () => {
    it('should return a valid ViewSittingRecordResponse object', () => {
      const mockResponse: ViewSittingRecordResponse = { "sittingRecords": [] };
      const dateSelected = '2022-01-01';

      spyOn(mockDateSvc,'formatDateFromForm').and.returnValue(dateSelected);
      spyOn(mockViewSittingRecordService,'postObject').and.returnValue(of(mockResponse))
  
      mockWorkflowService.getSittingRecordsData(1).subscribe(response => expect(response).toEqual(mockResponse));
    });
  });
});
