import { TestBed } from '@angular/core/testing';

import { SittingRecordsSubmitGuard } from './sitting-records-submit.guard';

describe('SittingRecordsSubmitGuard', () => {
  let guard: SittingRecordsSubmitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SittingRecordsSubmitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
