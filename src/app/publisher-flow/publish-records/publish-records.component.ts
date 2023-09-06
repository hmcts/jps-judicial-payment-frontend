import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublisherWorkflowService } from 'src/app/_workflows/publisher-workflow.service';

@Component({
  selector: 'app-publish-records',
  templateUrl: './publish-records.component.html',
  styleUrls: ['./publish-records.component.scss']
})
export class PublishRecordsComponent {

  constructor(
    private pbWorkflow: PublisherWorkflowService,
    private router: Router
  ){
    
  }

  goBack(){
    this.router.navigate(['sittingRecords', 'home'])
  }

}
