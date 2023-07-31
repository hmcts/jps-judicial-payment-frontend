import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { Cookie } from 'playwright';
import { SittingRecordsLandingGuard } from './sitting-records-landing.guard';

describe('SittingRecordsLandingGuard', () => {
  let guard: SittingRecordsLandingGuard;
  let mockCookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SittingRecordsLandingGuard);
    mockCookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if jps-recorder role is not logged in', () => {
    spyOn(mockCookieService, 'get').and.returnValue('jps-submitter');
    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should return false if jps-recorder role is logged in', () => {
    spyOn(mockCookieService, 'get').and.returnValue('jps-recorder');
    const result = guard.canActivate();

    expect(result).toBeFalse();
  });


});
