import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { SittingRecordsSubmitGuard } from './sitting-records-submit.guard';
import { HttpClientModule } from '@angular/common/http';

describe('SittingRecordsSubmitGuard', () => {
  let guard: SittingRecordsSubmitGuard;
  let mockWorkflowService: SubmitterWorkflowService;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(SittingRecordsSubmitGuard);
    mockWorkflowService = TestBed.inject(SubmitterWorkflowService);
    mockRouter = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if manageVisited is true', () => {
    spyOn(mockWorkflowService, 'getLandingVisited').and.returnValue(true);
  
    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should navigate to /sittingRecords/home and return false if manageVisited is false', () => {
    spyOn(mockRouter, 'navigate');
    spyOn(mockWorkflowService, 'getLandingVisited').and.returnValue(false);

    const result = guard.canActivate();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
    expect(result).toBeFalse();
  });
});
