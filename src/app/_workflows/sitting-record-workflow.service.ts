import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SittingRecordWorkflowService {

  formData: any;
  hasVisitedManage: boolean = false;

  constructor() { }

  setManageVisited(){
    this.hasVisitedManage = true;
  }

  getManageVisited(){
    return this.hasVisitedManage;
  }

  setFormData(data : FormGroup){
    this.formData = data;
  }

  getFormData(){
    return this.formData;
  }

  resetFormData(){
    this.formData = {};
  }
}
