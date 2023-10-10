import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SittingRecordsPublishGuard } from './sitting-records-publish.guard';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';
import { Router } from '@angular/router';

describe('SittingRecordsPublishGuard', () => {
    let guard: SittingRecordsPublishGuard;
    let publisherWorkflowService: PublisherWorkflowService;
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [PublisherWorkflowService],
        });
        guard = TestBed.inject(SittingRecordsPublishGuard);
        publisherWorkflowService = TestBed.inject(PublisherWorkflowService);
        router = TestBed.inject(Router)
    });

    it('should allow activation if landing has been visited', () => {
        spyOn(publisherWorkflowService, 'getLandingVisited').and.returnValue(true);
        const canActivate = guard.canActivate();
        expect(canActivate).toBeTrue();
    });

    it('should navigate to "sittingRecords/home" and disallow activation if landing has not been visited', () => {
        spyOn(publisherWorkflowService, 'getLandingVisited').and.returnValue(false);
        const routerSpy = spyOn(router, 'navigate');
        const canActivate = guard.canActivate();
        expect(canActivate).toBeFalse();
        expect(routerSpy).toHaveBeenCalledWith(['sittingRecords', 'home']);
    });
});