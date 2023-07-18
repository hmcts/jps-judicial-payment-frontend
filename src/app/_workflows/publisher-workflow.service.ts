import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateService } from '../_services/date-service/date-service';

@Injectable({
  providedIn: 'root'
})
export class PublisherWorkflowService {

  formData!: FormGroup;
  userFormData!: FormGroup;
  hasLandingVisited = false;

  constructor (
    private dateSvc: DateService
  ) {}

  setLandingVisited(){
    this.hasLandingVisited = true;
  }

  getLandingVisited(){
    return this.hasLandingVisited;
  }

  setFormData(data : FormGroup){
    this.formData = data;
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
