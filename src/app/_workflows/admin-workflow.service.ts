import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserInfoModel } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowService {
  formData!: FormGroup;
  userFormData!: FormGroup;
  userLandingData!: FormGroup;
  hasLandingVisited = false;
  userRole!: UserInfoModel

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
}
