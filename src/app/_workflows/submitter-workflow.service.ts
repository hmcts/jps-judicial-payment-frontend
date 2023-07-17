import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateService } from '../_services/date-service/date-service';
import { RegionModel } from '../_models/region.model'
import { ViewSittingRecordPost } from '../_models/viewSittingRecords.model';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service';

@Injectable({
  providedIn: 'root'
})
export class SubmitterWorkflowService {

  formData!: FormGroup;
  userFormData!: FormGroup;
  hasLandingVisited = false;
  financeRegions: RegionModel[] = [];

  constructor(
    private dateSvc: DateService,
    private viewSittingRecordService: ViewSittingRecordService,
  ){}


  setLandingVisited(){
    this.hasLandingVisited = true;
  }

  getLandingVisited(){
    return this.hasLandingVisited;
  }

  setFormData(data : FormGroup){
    this.formData = data;
  }

  setUserFormData(data : FormGroup){
    this.userFormData = data;
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

  setFinanceRegions(regions: RegionModel[]){
    this.financeRegions = regions;
  }

  getFinanceRegions(): RegionModel[]{
    return this.financeRegions;
  }

  getSittingRecordsData() {
    const postObj = new ViewSittingRecordPost();
    const { dateSelected, region } = this.formData.value;
    const dateToGet = this.dateSvc.formatDateFromForm(dateSelected);
    postObj.regionId = region.region_id;
    postObj.statusIds = ['RECORDED'];
    postObj.dateRangeFrom = dateToGet;
    postObj.dateRangeTo = dateToGet;

    return this.viewSittingRecordService.postObject(postObj);
  }

}
