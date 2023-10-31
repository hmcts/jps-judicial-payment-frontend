import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';
import { AdminWorkflowService } from '../../_workflows/admin-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsManageGuard implements CanActivate {
  constructor( 
    private router: Router,
    private cookies: CookieService,
    private submitterWorkFlowService: SubmitterWorkflowService,
    private adminWorkFlowService: AdminWorkflowService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = this.cookies.get('__userrole__');
    
    if(userRole.indexOf('jps-recorder') != -1 || 
      (userRole.indexOf('jps-submitter') != -1 && this.submitterWorkFlowService.getLandingVisited()) ||
      (userRole.indexOf('jps-admin') != -1 && this.adminWorkFlowService.getLandingVisited())) {
      return true;
    }
    else {
      void this.router.navigate(['sittingRecords', 'home'])
      return false;
    }
  
  }
  
}
