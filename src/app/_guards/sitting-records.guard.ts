import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SittingRecordWorkflowService } from '../_workflows/sitting-record-workflow.service';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordsGuard implements CanActivate {

  constructor(
    private srWorkflow: SittingRecordWorkflowService,
    private router: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.srWorkflow.getManageVisited()){
        return true
      }else{
        this.router.navigate(['sittingRecords','manage'])
        return false
      }
    
  }
  
}
