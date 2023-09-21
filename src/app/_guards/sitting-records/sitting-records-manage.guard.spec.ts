import { TestBed } from '@angular/core/testing';
import { SittingRecordsManageGuard } from './sitting-records-manage.guard';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

describe('SittingRecordsManageGuard', () => {
  let guard: SittingRecordsManageGuard;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService }
      ]
    });
    guard = TestBed.inject(SittingRecordsManageGuard);
    mockCookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    mockRouter = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if jps-recorder role is logged in', () => {
    spyOn(mockCookieService, 'get').and.returnValue('jps-recorder');
    const result = guard.canActivate();

    expect(result).toBeTrue();
  });

  it('should navigate to landing page if jps-recorder role is not logged in', () => {
    spyOn(mockRouter, 'navigate');
    spyOn(mockCookieService, 'get').and.returnValue('jps-publisher');

    const result = guard.canActivate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
    expect(result).toBeFalse();
  });

});



