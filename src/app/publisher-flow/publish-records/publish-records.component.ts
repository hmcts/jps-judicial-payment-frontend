import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mainPostObj } from 'src/app/_models/publishRecordsResponse.model';
import { PublisherWorkflowService } from 'src/app/_workflows/publisher-workflow.service';

@Component({
  selector: 'app-publish-records',
  templateUrl: './publish-records.component.html',
  styleUrls: ['./publish-records.component.scss']
})
export class PublishRecordsComponent implements OnInit {

  constructor(
    private pbWorkflow: PublisherWorkflowService,
    private router: Router
  ){
    
  }

  ngOnInit(){
    this.getPublishedRecords();
  }

  getPublishedRecords(): void {
    this.pbWorkflow.getPublishedRecords()
    .subscribe({
      next: (response: mainPostObj) => {
        console.log(response);
      },
      error: (error: object) => {
        console.log(error);
      }
    });
  }

  goBack(){
    this.router.navigate(['sittingRecords', 'home'])
  }

}
