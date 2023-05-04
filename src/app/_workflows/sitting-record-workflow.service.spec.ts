import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { SittingRecordWorkflowService } from './sitting-record-workflow.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewSittingRecordPost } from '../_models/view-sitting-records-post';

describe('SittingRecordWorkflowService', () => {
  let service: SittingRecordWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SittingRecordWorkflowService],
      imports: [HttpClientModule]
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

  describe('formPostObject', () => {
    it('should return a valid ViewSittingRecordPost object', () => {
      const form = new FormGroup({
        venue: new FormControl('1234'),
        dateSelected: new FormGroup({
          dateDay: new FormControl('1'),
          dateMonth: new FormControl('5'),
          dateYear: new FormControl('2023')
        })
      });
      service.setFormData(form);
      const expectedPostObj = new ViewSittingRecordPost()
      expectedPostObj.epimmsId = '1234'
      expectedPostObj.dateRangeFrom = '1/5/2023'
      expectedPostObj.dateRangeTo = '1/5/2023'
  
      expect(service.formPostObject()).toEqual(expectedPostObj);
    });
  });
  
});
