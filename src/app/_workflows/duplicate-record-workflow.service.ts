import { Injectable } from '@angular/core';
import { DateService } from '../_services/date-service/date-service'
import { UserInfoService } from '../_services/user-info-service/user-info-service';
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { RecorderWorkflowService } from './recorder-workflow.service';
import { Observable, of } from 'rxjs';
import { SittingRecordsPostObj, DuplicateResponse, ValidRecord } from '../_models/addSittingRecords.model';

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
    private srWorkFlow: RecorderWorkflowService
  ) { }

  getErrorRecords() {
    return this.recordErrors
  }

  resetErrorRecords() {
    this.recordErrors = undefined;
  }
  
  setErrorRecords(recordsWithErrors): void {
    this.recordErrors = this.sortedRecords(recordsWithErrors);
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
    let validRecords: DuplicateResponse[] = [];

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

  sortedRecords(errorRecords) {
    return [...errorRecords.filter(record => record.errorCode === 'POTENTIAL_DUPLICATE_RECORD'),
          ...errorRecords.filter(record => record.errorCode === 'INVALID_DUPLICATE_RECORD'),
        ...errorRecords.filter(record => record.errorCode === 'VALID')
      ];
  }

  matchValidRecords(validRecords, formData){
    const dupedRecords:  Array<ValidRecord> = [];
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

  formResolvedDuplicateObject(errorRecords, validRecords, optionsSelected){
    const submitting: Array<DuplicateResponse> = [];
    const notSubmitting: Array<DuplicateResponse> = [];
    errorRecords.forEach((obj, index) => {
      if(obj.errorCode != 'VALID'){
        if (optionsSelected[index]) {
            submitting.push(obj);
        } else {
            notSubmitting.push(obj);
        }
      }
    });

    validRecords.forEach(element => {
      const matchedRecord = this.matchValidRecords([element], this.srWorkFlow.getAddSittingRecords())
      const obj = Object.assign({}, element, matchedRecord[0]);
      submitting.push(obj)
    });
    
    this.resolvedDuplicateSelections = { submitting, notSubmitting }
  }

  postResolvedDuplicates(resolvedDuplicates){
    const resolvedObjects: SittingRecordsPostObj[] = []
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

  getValidRecordsTableCaption(): string{
    for(const i in this.recordErrors){
      if(this.recordErrors[i].errorCode === 'POTENTIAL_DUPLICATE_RECORD'){
        return 'Resolve any duplicates before saving the record(s) below:'
      }
    }
    return 'Click continue to save the record(s) below:'
  }

  checkForRecordsToSubmit(needsToBeSaved): Observable<boolean> {
    for(const i in needsToBeSaved){
      if(needsToBeSaved[i]){
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