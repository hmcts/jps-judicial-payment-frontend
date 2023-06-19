import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-invalid-duplicate',
  templateUrl: './invalid-duplicate.component.html',
  styleUrls: ['./invalid-duplicate.component.scss']
})
export class InvalidDuplicateComponent {

  @Input() recordData;

}
