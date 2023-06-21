import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-potential-duplicate',
  templateUrl: './potential-duplicate.component.html',
  styleUrls: ['./potential-duplicate.component.scss']
})
export class PotentialDuplicateComponent {
  
  @Input() recordData;
  @Output() valueChange = new EventEmitter<any>();
  
  selectedValue: any;

  updateSelection(newValue: any){
    this.selectedValue = newValue
    this.valueChange.emit(this.selectedValue);
  }
}
