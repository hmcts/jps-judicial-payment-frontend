import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { SittingRecordsViewGuard } from './sitting-records-view.guard';
import { HttpClientModule } from '@angular/common/http';

describe('SittingRecordsViewGuard', () => {
  let guard: SittingRecordsViewGuard;
  let mockWorkflowService: SittingRecordWorkflowService;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(SittingRecordsViewGuard);
    mockRouter = TestBed.inject(Router);
    mockWorkflowService = TestBed.inject(SittingRecordWorkflowService);
  });

  it('should return true if manageVisited is true', () => {
    spyOn(mockWorkflowService, 'getManageVisited').and.returnValue(true);
  
    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should navigate to /sittingRecords/manage and return false if manageVisited is false', () => {
    spyOn(mockRouter, 'navigate');
    spyOn(mockWorkflowService, 'getManageVisited').and.returnValue(false);

    const result = guard.canActivate();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
    expect(result).toBeFalse();
  });
  
});
