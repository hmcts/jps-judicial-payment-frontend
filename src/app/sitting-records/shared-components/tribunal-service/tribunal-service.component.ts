import { Component } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tribunal-service',
  templateUrl: './tribunal-service.component.html',
  styleUrls: ['./tribunal-service.component.scss']
})
export class TribunalServiceComponent {

  constructor(public parentFormGroup: FormGroupDirective) { }

  tribunalServices = environment.tribunalServices;

}
