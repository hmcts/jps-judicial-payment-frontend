import { TestBed } from '@angular/core/testing';
import { SittingRecordsManageGuard } from './sitting-records-manage.guard';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('SittingRecordsManageGuard', () => {
  let guard: SittingRecordsManageGuard;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockSubmitterWorkflowService: SubmitterWorkflowService;
  let mockAdminWorkflowService: AdminWorkflowService;
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: CookieService }
      ]
    });
    guard = TestBed.inject(SittingRecordsManageGuard);
    mockCookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    mockSubmitterWorkflowService = TestBed.inject(SubmitterWorkflowService);
    mockAdminWorkflowService = TestBed.inject(AdminWorkflowService);
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

  it('should return true if jps-submitter role is logged in and Landing Page is visited', () => {
    spyOn(mockCookieService, 'get').and.returnValue('jps-submitter');
    spyOn(mockSubmitterWorkflowService, 'getLandingVisited').and.returnValue(true);
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should navigate to /sittingRecords/home and return false if jps-submitter role is logged in and Landing Page is not visited', () => {
    spyOn(mockRouter, 'navigate');
    spyOn(mockCookieService, 'get').and.returnValue('jps-publisher');

    const result = guard.canActivate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
    expect(result).toBeFalse();
  });

});



