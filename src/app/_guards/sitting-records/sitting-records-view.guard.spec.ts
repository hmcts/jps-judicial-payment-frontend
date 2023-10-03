import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ManageSittingRecordsWorkflowService } from '../../_workflows/manage-sitting-record-workflow.service';
import { SittingRecordsViewGuard } from './sitting-records-view.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SittingRecordsViewGuard', () => {
  let guard: SittingRecordsViewGuard;
  let mockmsrWorkflowService: ManageSittingRecordsWorkflowService;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(SittingRecordsViewGuard);
    mockRouter = TestBed.inject(Router);
    mockmsrWorkflowService = TestBed.inject(ManageSittingRecordsWorkflowService);
  });

  it('should return true if manageVisited is true', () => {
    spyOn(mockmsrWorkflowService, 'getManageVisited').and.returnValue(true);
  
    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should navigate to /sittingRecords/manage and return false if manageVisited is false', () => {
    spyOn(mockRouter, 'navigate');
    spyOn(mockmsrWorkflowService, 'getManageVisited').and.returnValue(false);

    const result = guard.canActivate();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
    expect(result).toBeFalse();
  });
  
});
