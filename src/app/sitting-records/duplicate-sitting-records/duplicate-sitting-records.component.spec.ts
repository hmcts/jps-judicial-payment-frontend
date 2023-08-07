import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DuplicateRecordWorkflowService } from '../../_workflows/duplicate-record-workflow.service';
import { DuplicateSittingRecordsComponent } from './duplicate-sitting-records.component';
import { of } from 'rxjs';

import { ErrorSummaryComponent } from '../../error-summary/error-summary.component'
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DuplicateSittingRecordsComponent', () => {
  let component: DuplicateSittingRecordsComponent;
  let fixture: ComponentFixture<DuplicateSittingRecordsComponent>;
  let router: Router;
  let workflowService: DuplicateRecordWorkflowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicateSittingRecordsComponent, ErrorSummaryComponent ],
      providers: [
        { provide: Router},
        { provide: DuplicateRecordWorkflowService },
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateSittingRecordsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    workflowService = TestBed.inject(DuplicateRecordWorkflowService);

    spyOn(router, 'navigate');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateReplaceDuplicate', () => {
    it('should update optionsSelected array', () => {
      component.optionsSelected = [false, false];
      component.updateReplaceDuplicate(true, 1);
      expect(component.optionsSelected).toEqual([false, true]);
    });
  });

  describe('navigateToPreviousPage', () => {
    it('should navigate to previous page', () => {
      component.navigateToPreviousPage();
      expect(router.navigate).toHaveBeenCalledWith(['../addConfirm']);
    });
  });

  describe('cancelCurrentFlow', () => {
    it('should navigate to manage page', () => {
      component.cancelCurrentFlow();
      expect(router.navigate).toHaveBeenCalledWith(['../manage']);
    });
  });

  describe('resubmitSittingRecords', () => {
    it('should navigate to success page if successful', () => {
      spyOn(workflowService, 'postResolvedDuplicates').and.returnValue(of({
        message: 'success'
      }));

      component.resubmitSittingRecords();

      expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'addSuccess']);
    });

    it('should set errors and navigate to duplicate page if failed', () => {
      const errorRecords = [{error: 'error'}];
      spyOn(workflowService, 'postResolvedDuplicates').and.returnValue(of({
        errorRecords  
      }));
      spyOn(workflowService, 'setErrorRecords');

      component.resubmitSittingRecords();

      expect(workflowService.setErrorRecords).toHaveBeenCalledWith(errorRecords);
      expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'addDuplicates']);
    });
  });

  describe('allOptionsSelected', () => {
    it('should return true if all values are not null', () => {
      component.optionsSelected = [true, false, true];
      expect(component.allOptionsSelected).toBe(true)
    })

    it('should return false if one value is null', () => {
      component.optionsSelected = [true, null, true];
      expect(component.allOptionsSelected).toBe(false)
    })

    it('should return false if all values are null', () => {
      component.optionsSelected = [null, null, null];
      expect(component.allOptionsSelected).toBe(false)
    })
  })

});