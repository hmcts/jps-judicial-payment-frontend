import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { sittingRecordsPostObj, sittingRecordsPostBody } from '../_models/addSIttingRecords'
import { DateService } from '../_services/date-service/date-service'

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

  getAddSittingRecords(){
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

  formAndPostNewSittingRecord(callback){
    const { JOH, period } = this.addSittingRecords.controls;
    const { dateSelected, tribunalService, venue } = this.formData.value;
    const postObj = new sittingRecordsPostBody();
  
    JOH.value.forEach(joh => {
      const newSRPostObj = new sittingRecordsPostObj();
  
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
  
      newSRPostObj.sittingDate = this.dateSvc.formatDateFromForm(dateSelected);
      newSRPostObj.epimmsId = venue;
      newSRPostObj.replaceDuplicate = false;
      newSRPostObj.judgeRoleTypeId = joh.johRole;
      newSRPostObj.hmctsServiceCode = tribunalService;
      //TODO: update below properties to use data retrieved from API call on addSR page
      newSRPostObj.personalCode = joh.johName
      newSRPostObj.contractTypeId = ''

      postObj.postedSittingRecords.push(newSRPostObj);
    });
  
    callback();
  }
  
}
