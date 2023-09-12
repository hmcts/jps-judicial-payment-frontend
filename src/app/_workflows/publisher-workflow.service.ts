import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateService } from '../_services/date-service/date-service';
import { PublisherFlowService } from '../_services/publisher-flow-services/publisher-flow-service'

@Injectable({
  providedIn: 'root'
})
export class PublisherWorkflowService {

  formData!: FormGroup;
  userLandingData!: FormGroup;
  hasLandingVisited = false;

  constructor (
    private dateSvc: DateService,
    private pbService: PublisherFlowService
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

  getPublishedRecords() {

    console.log(this.getFormData())
    const hmctsServCode = this.formData.value['tribunalService']['hmctsServiceCode']

    const postObj = {
      dateRangeTo: this.dateSvc.formatDateForPost(this.formData.value['dateSelected']),
      publish: false
    }

    return this.pbService.getPublishedRecords(hmctsServCode, postObj);
  }
}
