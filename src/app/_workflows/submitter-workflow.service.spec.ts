import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { RegionModel } from '../_models/region.model';
import { ViewSittingRecordPost, ViewSittingRecordResponse } from '../_models/viewSittingRecords.model';
import { DateService } from '../_services/date-service/date-service';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';

import { SubmitterWorkflowService } from './submitter-workflow.service';

describe('SubmitterWorkflowService', () => {
  let mockWorkflowService: SubmitterWorkflowService;
  let mockViewSittingRecordService: ViewSittingRecordService;
  let mockformData: FormGroup;
  let mockUserFormData: FormGroup;
  let mockDateSvc: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmitterWorkflowService, ViewSittingRecordService, DateService],
      imports: [HttpClientModule]
    });
    
    mockWorkflowService = TestBed.inject(SubmitterWorkflowService);
    mockViewSittingRecordService = TestBed.inject(ViewSittingRecordService);
    mockDateSvc = TestBed.inject(DateService);
    mockformData = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
      region: ['Region 1'],
    });

    mockUserFormData = new FormBuilder().group({
      option: ['opt2'],
    });

    mockWorkflowService.setFormData(mockformData);
    mockWorkflowService.setUserFormData(mockUserFormData);
  });

  it('should be created', () => {
    expect(mockWorkflowService).toBeTruthy();
  });

  describe('setManageVisited', () => {
    it('should set hasVisitedManage to true', () => {
      mockWorkflowService.setLandingVisited();
      expect(mockWorkflowService.getLandingVisited()).toBe(true);
    });
  });

  describe('setFormData and getFormData', () => {
    it('should set and get the form data', () => {
      expect(mockWorkflowService.getFormData()).toBe(mockformData);
    });
  });

  describe('setUserFormData and getUserFormData', () => {
    it('should set and get the user form data', () => {
      expect(mockWorkflowService.getUserFormData()).toBe(mockUserFormData);
    });
  });

  describe('resetFormData', () => {
    it('should reset the form data', () => {
      expect(mockWorkflowService.getFormData()).toBe(mockformData);
      mockWorkflowService.resetFormData();
      expect(mockWorkflowService.getFormData().getRawValue()).toEqual({ dateSelected: null, tribunalService: null, region: null });
    });
  });

  describe('resetUserFormData', () => {
    it('should reset the user form data', () => {
      expect(mockWorkflowService.getUserFormData()).toBe(mockUserFormData);
      mockWorkflowService.resetUserFormData();
      expect(mockWorkflowService.getUserFormData().getRawValue()).toEqual({ option: null });
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
  
      mockWorkflowService.getSittingRecordsData(1).subscribe(response => expect(response).toEqual(mockResponse));
    });
  });
});
