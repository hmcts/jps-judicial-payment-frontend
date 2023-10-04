import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateService } from '../_services/date-service/date-service';

@Injectable({
  providedIn: 'root'
})
export class PublisherWorkflowService {

  formData!: FormGroup;
  userLandingData!: FormGroup;
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

  setUserLandingData(data : FormGroup){
    this.userLandingData = data;
  }

  getFormData(){
    return this.formData;
  }

  getUserLandingData(){
    return this.userLandingData;
  }

  resetFormData(){
    this.formData.reset();
  }

  resetUserLandingData() {
    this.userLandingData.reset();
  }
}
