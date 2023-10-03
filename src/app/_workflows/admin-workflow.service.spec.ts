import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AdminWorkflowService } from './admin-workflow.service';
import { JohService } from '../_services/joh-service/joh.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminWorkflowService', () => {
  let mockWorkflowService: AdminWorkflowService;
  let mockUserFormData: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JohService],
      imports: [HttpClientTestingModule]
    });
    mockWorkflowService = TestBed.inject(AdminWorkflowService);

    mockUserFormData = new FormBuilder().group({
      option: ['opt1'],
    });

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

  describe('setUserFormData and getUserFormData', () => {
    it('should set and get the user form data', () => {
      expect(mockWorkflowService.getUserFormData()).toBe(mockUserFormData);
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
