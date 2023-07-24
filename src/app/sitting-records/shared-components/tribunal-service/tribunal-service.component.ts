import { Component, Input, OnInit } from '@angular/core';
import { Form, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-tribunal-service',
  templateUrl: './tribunal-service.component.html',
  styleUrls: ['./tribunal-service.component.scss']
})
export class TribunalServiceComponent implements OnInit{
  @Input() formGroupName!: string;

  form!: FormGroup;
  
  constructor(private manageRecordsFormGroup: FormGroupDirective) {
    this.form = this.manageRecordsFormGroup.control.get(this.formGroupName) as FormGroup;
  }
  ngOnInit() { }
}
