import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserInfoModel } from '../_models/user.model';
import { DateService } from '../_services/date-service/date-service';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowService {
  formData!: FormGroup;
  userFormData!: FormGroup;
  userLandingData!: FormGroup;
  hasLandingVisited = false;
  userRole!: UserInfoModel
  cameFromManage = false

  constructor(
    private dateSvc: DateService
  ){}

  setLandingVisited(){
    this.hasLandingVisited = true;
  }

  getLandingVisited(){
    return this.hasLandingVisited;
  }

  setUserFormData(data : FormGroup){
    this.userFormData = data;
  }

  setFormData(formData){
    this.formData = formData;
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

  resetUserFormData() {
    this.userFormData.reset();
  }

  setUserLandingData(data : FormGroup){
    this.userLandingData = data;
  }
  getUserLandingData(){
    return this.userLandingData;
  }
  resetUserLandingData() {
    this.userLandingData.reset();
  }

  setUserInfo(userInfo: UserInfoModel){
    this.userRole = userInfo
  }
  getUserInfo(){
    return this.userRole
  }


  getCameFromManage(){
    return this.cameFromManage
  }
  setCameFromManage(){
    this.cameFromManage = true;
  }
  resetCameFromManage(){
    this.cameFromManage = false;
  }

  createPostObject(flagValues){
    const postObj = {
      "londonWeightingFlag": flagValues.londonFlag,
      "crownServantFlag": flagValues.crownFlag,
      "effectiveFromDate": this.dateSvc.formatDateForPostJoh(flagValues.flagDate)
    }
    return postObj
  }
}
