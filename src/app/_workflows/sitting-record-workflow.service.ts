import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service'
import { ViewSittingRecordPost } from '../_models/viewSittingRecords.model'
import { DateService } from '../_services/date-service/date-service'

@Injectable({
  providedIn: 'root'
})
export class SittingRecordWorkflowService {
  
  formData!: FormGroup;
  hasVisitedManage = false; 
  sittingRecordToDelete = {};

  constructor(
    private ViewSittingRecordService: ViewSittingRecordService,
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

  getFormData(){
    return this.formData;
  }

  resetFormData(){
    this.formData.reset();
  }

  getSittingRecordToDelete(){
    return this.sittingRecordToDelete
  }

  setSittingRecordToDelete(record){
    this.sittingRecordToDelete = record;
  }

  resetSittingRecordToDelete(){
    this.sittingRecordToDelete = {};
  }

  getSittingRecordsData() {
    const postObj = new ViewSittingRecordPost();
    const { dateSelected, venue } = this.formData.value;
    const dateToGet = this.dateSvc.formatDateFromForm(dateSelected);
    postObj.epimsId = venue.epimms_id;
    postObj.regionId = venue.region_id;
    postObj.dateRangeFrom = dateToGet;
    postObj.dateRangeTo = dateToGet;
    postObj.dateOrder = "ASCENDING";

    //TODO: add logic below to add in filter functionality
    return this.ViewSittingRecordService.postObject(postObj);
  }

}
