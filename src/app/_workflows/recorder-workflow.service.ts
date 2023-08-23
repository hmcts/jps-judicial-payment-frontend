import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service'
import { ViewSittingRecordPost } from '../_models/viewSittingRecords.model'
import { DateService } from '../_services/date-service/date-service'

@Injectable({
  providedIn: 'root'
})
export class RecorderWorkflowService {
  
  formData!: FormGroup;
  hasVisitedManage = false;

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
    console.log(this.formData);
  }

  getFormData(){
    return this.formData;
  }

  resetFormData(){
    this.formData.reset();
  }

  getSittingRecordsData() {
    const postObj = new ViewSittingRecordPost();
    const { dateSelected, venue } = this.formData.value;
    const dateToGet = this.dateSvc.formatDateForPost(dateSelected);
    postObj.epimsId = venue.epimms_id;
    postObj.regionId = venue.region_id;
    postObj.dateRangeFrom = dateToGet;
    postObj.dateRangeTo = dateToGet;
    postObj.dateOrder = "ASCENDING";

    return this.ViewSittingRecordService.postObject(postObj);
  }

}
