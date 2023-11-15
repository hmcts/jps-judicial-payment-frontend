import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CompareRecordsWorkflowService } from 'src/app/_workflows/compare-record-workflow.service';

@Injectable({
    providedIn: 'root'
})
export class CompareRecordGuard implements CanActivate {

    constructor(
        private cookies: CookieService,
        private compareRecordWorkflow: CompareRecordsWorkflowService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const userRole = this.cookies.get('__userrole__');
        if ((userRole.indexOf('jps-submitter') == -1) || !this.compareRecordWorkflow.getLandingVisited()) {
            void this.router.navigate(['sittingRecords', 'home'])
            return false;
        }
        else {
            return true;
        }

    }

}
