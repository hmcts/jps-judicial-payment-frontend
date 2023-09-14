import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duplicate-existing-confirm',
  templateUrl: './duplicate-existing-confirm.component.html',
  styleUrls: ['./duplicate-existing-confirm.component.scss']
})
export class DuplicateExistingConfirmComponent {

  constructor(
    private router: Router
  ){}

  navigateBackToView(){
    void this.router.navigate(['sittingRecords', 'view'])
  }
}
