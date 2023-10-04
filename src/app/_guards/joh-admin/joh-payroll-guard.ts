import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminWorkflowService } from 'src/app/_workflows/admin-workflow.service';

@Injectable({
    providedIn: 'root'
})
export class JohPayrollGuard implements CanActivate {

    constructor(
        private adminWorkflow: AdminWorkflowService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.adminWorkflow.getLandingVisited()) {
            return true;
        } else {
            void this.router.navigate(['sittingRecords', 'home']);
            return false;
        }
    }

}
