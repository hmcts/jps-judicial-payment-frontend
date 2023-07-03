import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { SittingRecordWorkflowService } from './sitting-record-workflow.service';

describe('SittingRecordWorkflowService', () => {
  let service: SittingRecordWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SittingRecordWorkflowService]
    });
    service = TestBed.inject(SittingRecordWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setManageVisited', () => {
    it('should set hasVisitedManage to true', () => {
      service.setManageVisited();
      expect(service.getManageVisited()).toBe(true);
    });
  });

  describe('setFormData and getFormData', () => {
    it('should set and get the form data', () => {
      const form = new FormGroup({
        name: new FormControl('John'),
        age: new FormControl(30)
      });
      service.setFormData(form);
      expect(service.getFormData()).toBe(form);
    });
  });

  describe('resetFormData', () => {
    it('should reset the form data', () => {
      const form = new FormGroup({
        name: new FormControl('John'),
        age: new FormControl(30)
      });
      service.setFormData(form);
      expect(service.getFormData()).toBe(form);
      service.resetFormData();
      expect(service.getFormData().getRawValue()).toEqual({ name: null, age: null });
    });
  });
});
