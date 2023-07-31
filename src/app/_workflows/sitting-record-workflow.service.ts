import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SittingRecordsPostObj, SittingRecordsPostBody } from '../_models/addSittingRecords.model';
import { DateService } from '../_services/date-service/date-service'
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service'
import { ViewSittingRecordPost } from '../_models/viewSittingRecords.model'

@Injectable({
  providedIn: 'root'
})
export class SittingRecordWorkflowService {
  
  formData!: FormGroup;
  addSittingRecords!: FormGroup;
  hasVisitedManage = false;
  cameFromConfirm = false;
    
  constructor(
    private dateSvc: DateService,
    private sittingRecordsSvc: SittingRecordsService,
    private ViewSittingRecordService: ViewSittingRecordService,

  ) {}

  setManageVisited(){
    this.hasVisitedManage = true;
  }

  getManageVisited(){
    return this.hasVisitedManage;
  }

  resetVisitedManaged(){
    this.hasVisitedManage = false;
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

  setAddSittingRecords(data: FormGroup){
    this.addSittingRecords = data;
  }

  getAddSittingRecords(): FormGroup{
    return this.addSittingRecords;
  }

  resetAddSittingRecords(){
    this.addSittingRecords.reset();
  }

  // confirmation get, set, reset
  checkCameFromConfirm(){
    return this.cameFromConfirm
  }

  setCameFromConfirm(){
    this.cameFromConfirm = true;
  }

  resetCameFromConfirm(){
    this.cameFromConfirm = false;
  }

  formAndPostNewSittingRecord(){
    const { JOH, period } = this.addSittingRecords.controls;
    const { dateSelected, tribunalService, venue } = this.formData.value;
    const postBody = new SittingRecordsPostBody();
    postBody.recordedByIdamId = '';
    postBody.recordedByName = '';
  
    JOH.value.forEach(joh => {
      const newSRPostObj = new SittingRecordsPostObj();
  
      newSRPostObj.hmctsServiceCode = tribunalService;
      newSRPostObj.sittingDate = this.dateSvc.formatDateFromForm(dateSelected);
      newSRPostObj.epimmsId = venue.epimms_id;
      newSRPostObj.personalCode = joh.johName
      //TODO: update below properties to use data retrieved from API call on addSR page
      newSRPostObj.contractTypeId = ''
      newSRPostObj.judgeRoleTypeId = joh.johRole;
      newSRPostObj.replaceDuplicate = false;

      switch (period.value) {
        case 'am':
          newSRPostObj.AM = true;
          newSRPostObj.PM = false;
          break;
        case 'pm':
          newSRPostObj.AM = false;
          newSRPostObj.PM = true;
          break;
        case 'both':
          newSRPostObj.AM = true;
          newSRPostObj.PM = true;
          break;
      }
      
      postBody.recordedSittingRecords.push(newSRPostObj);
    });
  
    return this.sittingRecordsSvc.postNewSittingRecord(postBody);
  }
  
  getSittingRecordsData() {
    const postObj = new ViewSittingRecordPost();
    const { dateSelected, venue } = this.formData.value;
    const dateToGet = this.dateSvc.formatDateForPost(dateSelected);
    postObj.epimmsId = venue.epimms_id;
    postObj.regionId = venue.region_id;
    postObj.dateRangeFrom = dateToGet;
    postObj.dateRangeTo = dateToGet;
    postObj.dateOrder = "ASCENDING";

    return this.ViewSittingRecordService.postObject(postObj);
  }

}
