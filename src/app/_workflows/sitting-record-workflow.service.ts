import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { UserInfoService } from '../_services/user-info-service/user-info-service'
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service'
import { ViewSittingRecordPost } from '../_models/viewSittingRecords.model'
import { DateService } from '../_services/date-service/date-service'

@Injectable({
  providedIn: 'root'
})
export class SittingRecordWorkflowService {
  
  formData!: FormGroup;
  addSittingRecords!: FormGroup;
  hasVisitedManage = false;
  cameFromConfirm = false;
  sittingRecordsRoleList;
    
  constructor(
    private dateSvc: DateService,
    private sittingRecordsSvc: SittingRecordsService,
    private uInfoSvc: UserInfoService,
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

  setSittingRecordsRoleList(userRolesList){
    this.sittingRecordsRoleList = userRolesList
  }

  getSittingRecordsRoleList(){
    return this.sittingRecordsRoleList
  }

  resetSittingRecordsRoleList(){
    this.sittingRecordsRoleList = undefined;
  }

  formAndPostNewSittingRecord() {
    const { JOH, period } = this.addSittingRecords.controls;
    const { dateSelected, tribunalService, venue } = this.formData.value;

    const postBody = {
      recordedByIdamId: this.uInfoSvc.getIdamId(),
      recordedByName: this.uInfoSvc.getUserName(),
      recordedSittingRecords: JOH.value.map(joh => this.sittingRecordsSvc.createNewSRPostObj(joh, tribunalService, dateSelected, venue, period))
    };
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
