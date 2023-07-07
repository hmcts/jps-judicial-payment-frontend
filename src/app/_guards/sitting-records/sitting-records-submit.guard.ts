import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubmitterWorkflowService } from '../../_workflows/submitter-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsSubmitGuard implements CanActivate {

  constructor(
    private srWorkflow: SubmitterWorkflowService,
    private router: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.srWorkflow.getManageVisited()) {
      return true;
    } else {
      void this.router.navigate(['sittingRecords','home']);
      return false;
    }
  }
  
}
