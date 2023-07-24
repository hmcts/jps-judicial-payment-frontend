import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-tribunal-service',
  templateUrl: './tribunal-service.component.html',
  styleUrls: ['./tribunal-service.component.scss']
})
export class TribunalServiceComponent {

  constructor(public manageRecordsFormGroup: FormGroupDirective) { }

}
