import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateService } from '../_services/date-service/date-service';

@Injectable({
  providedIn: 'root'
})
export class SubmitterWorkflowService {

  formData!: FormGroup;
  userFormData!: FormGroup;
  hasVisitedManage = false;

  constructor(
    private dateSvc: DateService
  ){}


  setManageVisited(){
    this.hasVisitedManage = true;
  }

  getManageVisited(){
    return this.hasVisitedManage;
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

  /*getSittingRecordsData() {
    const postObj = new ViewSittingRecordPost();
    const { dateSelected, venue } = this.formData.value;
    const dateToGet = this.dateSvc.formatDateFromForm(dateSelected);
    postObj.epimsId = venue.epimms_id;
    postObj.regionId = venue.region_id;
    postObj.dateRangeFrom = dateToGet;
    postObj.dateRangeTo = dateToGet;
    postObj.dateOrder = "ASCENDING";

    return this.ViewSittingRecordService.postObject(postObj);
  }*/
}
