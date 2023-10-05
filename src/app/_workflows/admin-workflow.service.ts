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
  cameFromManage = false;
  flagValues;

  johAppointment;
  payrollID;

  constructor(
    private dateSvc: DateService
  ){}

  setLandingVisited(){
    this.hasLandingVisited = true;
  }
  getLandingVisited(){
    return this.hasLandingVisited;
  }

  setFormData(formData){
    this.formData = formData;
  }
  getFormData(){
    return this.formData;
  }
  resetFormData(){
    this.formData.reset();
  }
  
  getUserFormData(){
    return this.userFormData;
  }
  setUserFormData(data : FormGroup){
    this.userFormData = data;
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

  setFlagValues(flagVals){
    this.flagValues = flagVals
  }
  getFlagValues(){
    return this.flagValues
  }

  setJohAppointment(appointment: string){
    this.johAppointment = appointment
  }
  getJohAppointment(){
    return this.johAppointment;
  }
  resetJohAppointment(){
    this.johAppointment = null;
  }

  setPayrollId(payrollID: string){
    this.payrollID = payrollID
  }
  getPayrollId(){
    return this.payrollID;
  }
  resetPayrollId(){
    this.payrollID = null;
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
