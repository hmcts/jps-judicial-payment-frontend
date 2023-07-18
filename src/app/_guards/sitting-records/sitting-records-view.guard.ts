import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedWorkflowService } from '../../_workflows/shared-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsViewGuard implements CanActivate {

  constructor(
    private sharedWorkflow: SharedWorkflowService,
    private router: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.sharedWorkflow.getManageVisited()) {
      return true;
    } else {
      void this.router.navigate(['sittingRecords','manage']);
      return false;
    }
    
  }
  
}
