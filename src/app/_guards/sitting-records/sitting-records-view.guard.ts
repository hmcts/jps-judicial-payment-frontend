import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RecorderWorkflowService } from '../../_workflows/recorder-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsViewGuard implements CanActivate {

  constructor(
    private recorderWorkflow: RecorderWorkflowService,
    private router: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.recorderWorkflow.getManageVisited()) {
      return true;
    } else {
      void this.router.navigate(['sittingRecords','manage']);
      return false;
    }
    
  }
  
}
