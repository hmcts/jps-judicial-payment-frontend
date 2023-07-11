import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-sitting-records',
  templateUrl: './view-sitting-records.component.html',
  styleUrls: ['./view-sitting-records.component.scss']
})
export class ViewSittingRecordsComponent {

  tribService = "";
  venue = "";
  date = "";

  goBack(){
    void this.router.navigate(['sittingRecords','manage'])
  }

  addNewRecord(){
    void this.router.navigate(['sittingRecords','add'])
  }

  constructor(
    private router: Router
  ){}
    


}
