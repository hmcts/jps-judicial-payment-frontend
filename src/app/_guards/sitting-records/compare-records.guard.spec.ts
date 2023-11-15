import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CompareRecordGuard } from './compare-records.guard';
import { CookieService } from 'ngx-cookie-service';
import { CompareRecordsWorkflowService } from 'src/app/_workflows/compare-record-workflow.service';
import { of } from 'rxjs';

describe('CompareRecordGuard', () => {
    let guard: CompareRecordGuard;
    let cookieService: CookieService;
    let compareRecordsWorkflowService: CompareRecordsWorkflowService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                CompareRecordGuard,
                { provide: CookieService, useValue: { get: () => '' } },
                { provide: CompareRecordsWorkflowService, useValue: { getLandingVisited: () => false } }
            ]
        });

        guard = TestBed.inject(CompareRecordGuard);
        cookieService = TestBed.inject(CookieService);
        compareRecordsWorkflowService = TestBed.inject(CompareRecordsWorkflowService);
        router = TestBed.inject(Router);
    });

    it('should navigate to home when user role is not jps-submitter and landing not visited', () => {
        spyOn(cookieService, 'get').and.returnValue('');
        spyOn(compareRecordsWorkflowService, 'getLandingVisited').and.returnValue(false);
        spyOn(router, 'navigate');

        expect(guard.canActivate()).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith(['sittingRecords', 'home']);
    });

    it('should not navigate when user role is jps-submitter and landing visited', () => {
        spyOn(cookieService, 'get').and.returnValue('jps-submitter');
        spyOn(compareRecordsWorkflowService, 'getLandingVisited').and.returnValue(true);
        spyOn(router, 'navigate');

        expect(guard.canActivate()).toBeTrue();
        expect(router.navigate).not.toHaveBeenCalled();
    });

});
