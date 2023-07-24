import { Component } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-sitting-date',
  templateUrl: './sitting-date.component.html',
  styleUrls: ['./sitting-date.component.scss']
})
export class SittingDateComponent {

  constructor(public manageRecordsFormGroup: FormGroupDirective) { }

  get f(): { [key: string]: AbstractControl } {
    return this.manageRecordsFormGroup?.control.controls;
  }
}
