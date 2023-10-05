import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PublisherWorkflowService } from './publisher-workflow.service';

describe('PublisherWorkflowService', () => {
  let mockWorkflowService: PublisherWorkflowService;
  let mockformData: FormGroup;
  let mockUserLandingData: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PublisherWorkflowService ]
    });
    mockWorkflowService = TestBed.inject(PublisherWorkflowService);
    mockformData = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
    });

    mockUserLandingData = new FormBuilder().group({
      option: ['opt4'],
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
      expect(mockWorkflowService.getFormData().getRawValue()).toEqual({ dateSelected: null, tribunalService: null });
    });
  });

  describe('resetUserLandingData', () => {
    it('should reset the user form data', () => {
      expect(mockWorkflowService.getUserLandingData()).toBe(mockUserLandingData);
      mockWorkflowService.resetUserLandingData();
      expect(mockWorkflowService.getUserLandingData().getRawValue()).toEqual({ option: null });
    });
  });

});
