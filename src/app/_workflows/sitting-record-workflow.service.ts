import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewSittingRecordHttp } from '../_services/view-sitting-records-http-service'
import { ViewSittingRecordPost } from '../_models/view-sitting-records-post'
import { DateService } from '../_services/date-service'

@Injectable({
  providedIn: 'root'
})
export class SittingRecordWorkflowService {
  
  formData!: FormGroup;
  hasVisitedManage = false; 

  constructor(
    private ViewSittingRecordHttpService: ViewSittingRecordHttp,
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

  formPostObject(){
    const postObj = new ViewSittingRecordPost();
    const { dateSelected, venue } = this.formData.value;
    const dateToGet = this.dateSvc.formatDateFromForm(dateSelected)
    postObj.epimmsId = venue
    postObj.dateRangeFrom = dateToGet
    postObj.dateRangeTo = dateToGet

    //TODO: add logic below to add in filter functionality
    
    return postObj
  }

  getTableData() {
    return this.ViewSittingRecordHttpService.postObject(this.formPostObject())
  }

}
