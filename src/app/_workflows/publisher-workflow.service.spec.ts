import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PublisherWorkflowService } from './publisher-workflow.service';

describe('PublisherWorkflowService', () => {
  let mockWorkflowService: PublisherWorkflowService;
  let mockformData: FormGroup;
  let mockUserFormData: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PublisherWorkflowService ]
    });
    mockWorkflowService = TestBed.inject(PublisherWorkflowService);
    mockformData = new FormBuilder().group({
      dateSelected: ['2022-01-01'],
      tribunalService: ['Tribunal 1'],
    });

    mockUserFormData = new FormBuilder().group({
      option: ['opt4'],
    });

    mockWorkflowService.setFormData(mockformData);
    mockWorkflowService.setUserFormData(mockUserFormData);
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

  describe('setUserFormData and getUserFormData', () => {
    it('should set and get the user form data', () => {
      expect(mockWorkflowService.getUserFormData()).toBe(mockUserFormData);
    });
  });

  describe('resetFormData', () => {
    it('should reset the form data', () => {
      expect(mockWorkflowService.getFormData()).toBe(mockformData);
      mockWorkflowService.resetFormData();
      expect(mockWorkflowService.getFormData().getRawValue()).toEqual({ dateSelected: null, tribunalService: null });
    });
  });

  describe('resetUserFormData', () => {
    it('should reset the user form data', () => {
      expect(mockWorkflowService.getUserFormData()).toBe(mockUserFormData);
      mockWorkflowService.resetUserFormData();
      expect(mockWorkflowService.getUserFormData().getRawValue()).toEqual({ option: null });
    });
  });

});
