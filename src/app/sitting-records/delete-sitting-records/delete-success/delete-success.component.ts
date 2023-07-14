import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-success',
  templateUrl: './delete-success.component.html',
  styleUrls: ['./delete-success.component.scss']
})
export class DeleteSuccessComponent {

  constructor(
    private router: Router,
  ){}

  navigateToView(){
    this.router.navigate(['sittingRecords', 'view'])
  }

}
