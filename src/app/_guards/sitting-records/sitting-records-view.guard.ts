import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ManageSittingRecordsWorkflowService } from '../../_workflows/manage-sitting-record-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsViewGuard implements CanActivate {

  constructor(
    private msrWorkflow: ManageSittingRecordsWorkflowService,
    private router: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.msrWorkflow.getManageVisited()) {
      return true;
    } else {
      void this.router.navigate(['sittingRecords','manage']);
      return false;
    }
    
  }
  
}
