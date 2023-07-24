import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tribunal-service',
  templateUrl: './tribunal-service.component.html',
  styleUrls: ['./tribunal-service.component.scss']
})
export class TribunalServiceComponent{
  @Input() controlName!: string;
  @Input() parentForm!: FormGroup;
  
}
