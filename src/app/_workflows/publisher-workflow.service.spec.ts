import { TestBed } from '@angular/core/testing';

import { PublisherWorkflowService } from './publisher-workflow.service';

describe('PublisherWorkflowService', () => {
  let service: PublisherWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
