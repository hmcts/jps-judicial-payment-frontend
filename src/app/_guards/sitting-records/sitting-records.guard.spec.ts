import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { SittingRecordsGuard } from './sitting-records.guard';

describe('SittingRecordsGuard', () => {
  let guard: SittingRecordsGuard;
  let mockWorkflowService: jasmine.SpyObj<SittingRecordWorkflowService>;
  let mockRouter: Router;

  beforeEach(() => {
    const mockWorkflowServiceSpy = jasmine.createSpyObj('SittingRecordWorkflowService',['getManageVisited']);
    const mockRouterSpy = jasmine.createSpyObj('Router',['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SittingRecordWorkflowService, useValue: mockWorkflowServiceSpy },
        { provide: Router, useValue: mockRouterSpy }
      ]
    });
    guard = TestBed.inject(SittingRecordsGuard);
    mockRouter = TestBed.inject(Router);
    mockWorkflowService = TestBed.inject(SittingRecordWorkflowService) as jasmine.SpyObj<SittingRecordWorkflowService>;

  });

  it('should return true if manageVisited is true', () => {
    mockWorkflowService.getManageVisited.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should navigate to /sittingRecords/manage and return false if manageVisited is false', () => {
    mockWorkflowService.getManageVisited.and.returnValue(false);

    const result = guard.canActivate();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'manage']);
    expect(result).toBeFalse();
  });
  
});
