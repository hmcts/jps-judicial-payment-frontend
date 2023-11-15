import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-sitting-date',
  templateUrl: './sitting-date.component.html',
  styleUrls: ['./sitting-date.component.scss']
})
export class SittingDateComponent {

  @Input() dateHeaderText;
  @Input() formName = 'dateSelected';

  constructor(public parentFormGroup: FormGroupDirective) { }

  get f(): { [key: string]: AbstractControl } {
    return this.parentFormGroup?.control.controls;
  }
}
