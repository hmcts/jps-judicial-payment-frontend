import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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

  describe('resetVisitedManaged', () => {
    it('should set hasVisitedManaged to false', () => {
      service.setManageVisited()
      service.resetVisitedManaged()
      expect(service.getManageVisited()).toBe(false);
    });
  });

  describe('formAndPostNewSittingRecord', () => {
    it('should create a new sitting record post body, and set AM', () => {
      const postFormData = new FormGroup({
        JOH: new FormControl([
          { johRole: 'role1', johName: 'name1' },
          { johRole: 'role2', johName: 'name2' }
        ]),
        period: new FormControl('am')
      });
  
      const formDataMock: FormGroup = new FormBuilder().group({
        dateSelected: ['2022-01-01'],
        tribunalService: ['Tribunal 1'],
        venue: ['Venue 1'],
      });
  
      service.setFormData(formDataMock)
  
      const callback = jasmine.createSpy('callback');
      service.setAddSittingRecords(postFormData)
      service.formAndPostNewSittingRecord(callback);
  
      expect(callback).toHaveBeenCalled();

    });

    it('should create a new sitting record post body, and set PM', () => {
      const postFormData = new FormGroup({
        JOH: new FormControl([
          { johRole: 'role1', johName: 'name1' },
          { johRole: 'role2', johName: 'name2' }
        ]),
        period: new FormControl('pm')
      });
  
      const formDataMock: FormGroup = new FormBuilder().group({
        dateSelected: ['2022-01-01'],
        tribunalService: ['Tribunal 1'],
        venue: ['Venue 1'],
      });
  
      service.setFormData(formDataMock)
  
      const callback = jasmine.createSpy('callback');

      service.setAddSittingRecords(postFormData)
      service.formAndPostNewSittingRecord(callback);
  
      expect(callback).toHaveBeenCalled();

    });

    it('should create a new sitting record post body, and set both', () => {
      const postFormData = new FormGroup({
        JOH: new FormControl([
          { johRole: 'role1', johName: 'name1' },
          { johRole: 'role2', johName: 'name2' }
        ]),
        period: new FormControl('both')
      });
  
      const formDataMock: FormGroup = new FormBuilder().group({
        dateSelected: ['2022-01-01'],
        tribunalService: ['Tribunal 1'],
        venue: ['Venue 1'],
      });
  
      service.setFormData(formDataMock)
  
      const callback = jasmine.createSpy('callback');
  
      service.setAddSittingRecords(postFormData)
      service.formAndPostNewSittingRecord(callback);

      expect(callback).toHaveBeenCalled();

    });
  });
});
