import { Injectable } from '@angular/core';
import { DateService } from '../_services/date-service/date-service'
import { UserInfoService } from '../_services/user-info-service/user-info-service';
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { SittingRecordWorkflowService } from './sitting-record-workflow.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuplicateRecordWorkflowService {

  recordErrors;
  resolvedDuplicateSelections;
  validResolvedRecords;

  constructor(
    private dateSvc: DateService,
    private uInfoSvc: UserInfoService,
    private sittingRecordsSvc: SittingRecordsService,
    private srWorkFlow: SittingRecordWorkflowService
  ) { }

  getErrorRecords() {
    return this.recordErrors
  }

  resetErrorRecords() {
    this.recordErrors = undefined;
  }
  
  setErrorRecords(recordsWithErrors): void {
    this.recordErrors = recordsWithErrors;
  }

  getResolvedDuplicateSelections(){
    return this.resolvedDuplicateSelections;
  }

  setValidResolvedRecords(validRecords){
    this.validResolvedRecords = validRecords;
  }

  getValidResolvedRecords(){
    return this.validResolvedRecords;
  }

  getDuplicateRecordErrors(){
    const optionsSelected: (true | false | null)[] = []
    let validRecords: any[] = [];

    this.recordErrors.forEach((record, index) => {
      optionsSelected.push(null)
      if (record.errorCode === 'VALID') {
        optionsSelected[index] = true;
      }else if(record.errorCode === 'INVALID_DUPLICATE_RECORD'){
        optionsSelected[index] = false;
      }
    });
    validRecords = this.recordErrors.filter(record => record.errorCode === 'VALID');

    return {
      validRecords: validRecords,
      optionsSelected: optionsSelected,
      errorRecords: this.recordErrors
    }
  }

  matchValidRecords(validRecords, formData){
    const dupedRecords:  any[] = [];
    const johArray =  formData.value.JOH;
    const johPeriod = formData.value.period
    validRecords.forEach(record => {
      const personalCode = record.postedRecord.personalCode;
      const postedDate = record.postedRecord.sittingDate;
      const matchingJudgeDetail = johArray.find(detail => detail.johName.personalCode === personalCode);
      if(matchingJudgeDetail) {
        dupedRecords.push(
          {
            johName: matchingJudgeDetail.johName.fullName,
            johRole: matchingJudgeDetail.johRole.appointment,
            johPeriod: johPeriod,
            postedDate: postedDate
          }
        );
      }
  });
    return dupedRecords
  }

  formResolvedDuplicateObject(errorRecords, optionsSelected){
    const submitting: Array<any> = [];
    const notSubmitting: Array<any> = [];
    errorRecords.forEach((obj, index) => {
        if (optionsSelected[index]) {
          if(obj.errorCode == 'VALID'){
            const matchedRecord = this.matchValidRecords([obj], this.srWorkFlow.getAddSittingRecords())
            obj = Object.assign({}, obj, matchedRecord[0]);
          }
            submitting.push(obj);
        } else {
            notSubmitting.push(obj);
        }
    });
    this.resolvedDuplicateSelections = { submitting, notSubmitting }
  }

  postResolvedDuplicates(resolvedDuplicates){
    const resolvedObjects: any[] = []
    resolvedDuplicates.forEach((data) => {
        if(data.errorCode !== 'VALID'){
          data.postedRecord.replaceDuplicate = true
        }
        resolvedObjects.push(data.postedRecord)
    });

    const postBody = {
      recordedByIdamId: this.uInfoSvc.getIdamId(),
      recordedByName: this.uInfoSvc.getUserName(),
      recordedSittingRecords: resolvedObjects
    };

    if(resolvedObjects.length === 0){
      return of('No_Records')
    }else{
      for(const i in resolvedObjects){
        resolvedObjects[i].hmctsServiceCode = this.srWorkFlow.getHmctsServiceCode()
      }
    }
    return this.sittingRecordsSvc.postNewSittingRecord(postBody, this.srWorkFlow.getHmctsServiceCode());

  }

  checkForRecordsToSubmit(errorRecords): Observable<boolean> {
    for(const i in errorRecords){
      if(errorRecords[i].errorCode !== 'INVALID_DUPLICATE_RECORD'){
        return of(true)
      }
    }
    return of(false);
  }

  getDuplicateRecordText(errorRecords){
    const results: Array<string> = [];
    errorRecords.forEach(obj => {
        if (obj.errorCode === 'POTENTIAL_DUPLICATE_RECORD' && !results.includes('Potential duplicate found')) {
            results.push('Potential duplicate found');
        } else if (obj.errorCode === 'INVALID_DUPLICATE_RECORD' && !results.includes('Record already exists')) {
            results.push('Record already exists');
        }
    });
    return results
  }

}
