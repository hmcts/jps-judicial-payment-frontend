import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tribunal-service',
  templateUrl: './tribunal-service.component.html',
  styleUrls: ['./tribunal-service.component.scss']
})
export class TribunalServiceComponent {
  @Output() tribunal_ValueChanges = new EventEmitter();

  onChange(value: any) {
    this.tribunal_ValueChanges.emit(value);
  }
}
