import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SittingRecordsPostObj, SittingRecordsPostBody } from '../_models/addSittingRecords.model';
import { DateService } from '../_services/date-service/date-service'
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { UserInfoService } from '../_services/user-info-service/user-info-service'

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
    private uInfoSvc: UserInfoService
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
    postBody.recordedByIdamId = this.uInfoSvc.getIdamId();
    postBody.recordedByName = this.uInfoSvc.getUserName();
    JOH.value.forEach(joh => {
      const newSRPostObj = new SittingRecordsPostObj();
      newSRPostObj.hmctsServiceCode = tribunalService.hmctsServiceCode;
      newSRPostObj.sittingDate = this.dateSvc.createDateObjFromFormData(dateSelected);
      newSRPostObj.epimsId = venue.epimms_id;
      newSRPostObj.personalCode = joh.johName.personalCode
      //TODO: update below properties to use data retrieved from API call on addSR page
      newSRPostObj.contractTypeId = joh.johRole.appointment_type
      newSRPostObj.judgeRoleTypeId = joh.johRole.appointment;
      newSRPostObj.replaceDuplicate = false;
      newSRPostObj.durationBoolean = period.value
    
      
      postBody.recordedSittingRecords.push(newSRPostObj);
    });
  
    return this.sittingRecordsSvc.postNewSittingRecord(postBody);
  }
  
}
