import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RecorderWorkflowService } from '../../_workflows/recorder-workflow.service';
import { SittingRecordsViewGuard } from './sitting-records-view.guard';
import { HttpClientModule } from '@angular/common/http';

describe('SittingRecordsViewGuard', () => {
  let guard: SittingRecordsViewGuard;
  let mockWorkflowService: RecorderWorkflowService;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(SittingRecordsViewGuard);
    mockRouter = TestBed.inject(Router);
    mockWorkflowService = TestBed.inject(RecorderWorkflowService);
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
