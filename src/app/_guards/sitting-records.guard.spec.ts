import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SittingRecordWorkflowService } from '../_workflows/sitting-record-workflow.service';

import { SittingRecordsGuard } from './sitting-records.guard';

describe('SittingRecordsGuard', () => {
  let guard: SittingRecordsGuard;
  let mockWorkflowService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockWorkflowService = jasmine.createSpyObj(['getManageVisited']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SittingRecordWorkflowService, useValue: mockWorkflowService },
        { provide: Router, useValue: mockRouter },
      ]
    });
    guard = TestBed.inject(SittingRecordsGuard);
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
