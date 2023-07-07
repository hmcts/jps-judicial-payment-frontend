import { TestBed } from '@angular/core/testing';

import { SubmitterWorkflowService } from './submitter-workflow.service';

describe('SubmitterWorkflowService', () => {
  let service: SubmitterWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitterWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
