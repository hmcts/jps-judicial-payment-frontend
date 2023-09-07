import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PublisherWorkflowService } from '../../_workflows/publisher-workflow.service';

@Injectable({
    providedIn: 'root'
})
export class SittingRecordsPublishGuard implements CanActivate {

    constructor(
        private publisherWorkflow: PublisherWorkflowService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.publisherWorkflow.getLandingVisited()) {
            return true;
        } else {
            void this.router.navigate(['sittingRecords', 'home']);
            return false;
        }
    }

}
