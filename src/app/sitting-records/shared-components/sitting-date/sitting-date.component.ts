import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-sitting-date',
  templateUrl: './sitting-date.component.html',
  styleUrls: ['./sitting-date.component.scss']
})
export class SittingDateComponent {
  @Input() formGroupName!: string;
  form!: FormGroup;
  
  constructor(private manageRecordsFormGroup: FormGroupDirective) {
    this.form = this.manageRecordsFormGroup.control.get(this.formGroupName) as FormGroup;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form?.controls;
  }
}
