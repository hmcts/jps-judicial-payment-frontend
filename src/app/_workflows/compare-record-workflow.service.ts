import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewSittingRecordPost } from '../_models/viewSittingRecords.model';
import { ViewSittingRecordService } from '../_services/sitting-records-service/view-sitting-records-service'
import { DateService } from '../_services/date-service/date-service';

@Injectable({
    providedIn: 'root'
})
export class CompareRecordsWorkflowService {

    formData!: FormGroup;
    landingVisited = false;
    userLandingData!: FormGroup;

    constructor(
        private ViewSittingRecordService: ViewSittingRecordService,
        private dateSvc: DateService,
    ) {}
    

    setFormData(comparisonFormData: FormGroup){
        console.log(comparisonFormData)
        this.formData = comparisonFormData;
    }

    getFormData(){
        return this.formData;
    }

    setLandingVisited(){
        this.landingVisited = true;
    }

    getLandingVisited(){
        return this.landingVisited
    }

    resetLandingVisited(){
        this.landingVisited = false;
    }

    setUserLandingData(landingFormData){
        console.log(landingFormData)
        this.userLandingData = landingFormData;
    }

    getSittingRecordsData(pageSize: number) {
        const postObj = new ViewSittingRecordPost();
        const { region, tribunalService, startDate, endDate } = this.formData.value;
        const hmctsServiceCode = tribunalService.hmctsServiceCode;
        const dateToStart = this.dateSvc.formatDateForPost(startDate);
        const dateToEnd = this.dateSvc.formatDateForPost(endDate);
        postObj.regionId = region.region_id;
        postObj.dateRangeFrom = dateToStart;
        postObj.dateRangeTo = dateToEnd;
        postObj.dateOrder = "ASCENDING";
        postObj.pageSize = pageSize
    
        //TODO: add logic below to add in filter functionality
        return this.ViewSittingRecordService.postObject(postObj, hmctsServiceCode);
    }

}
