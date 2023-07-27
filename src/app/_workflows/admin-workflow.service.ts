import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowService {
  formData!: FormGroup;
  userFormData!: FormGroup;
  hasLandingVisited = false;

  constructor() { }

  setLandingVisited(){
    this.hasLandingVisited = true;
  }

  getLandingVisited(){
    return this.hasLandingVisited;
  }

  setUserFormData(data : FormGroup){
    this.userFormData = data;
  }

  getFormData(){
    return this.formData;
  }

  getUserFormData(){
    return this.userFormData;
  }

  resetFormData(){
    this.formData.reset();
  }

  resetUserFormData() {
    this.userFormData.reset();
  }
}
