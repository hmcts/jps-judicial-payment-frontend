import { Injectable } from '@angular/core';
import { DateService } from '../_services/date-service/date-service'
import { UserInfoService } from '../_services/user-info-service/user-info-service';
import { SittingRecordsService } from '../_services/sitting-records-service/sitting-records.service';
import { SittingRecordWorkflowService } from './sitting-record-workflow.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuplicateRecordWorkflowService {

  recordErrors;

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

  matchDuplicateRecord(personalCode, formData){
    for(const joh in formData.value.JOH){
      if(formData.value.JOH[joh]['johName'].personalCode === personalCode){
        return { johName: formData.value.JOH[joh]['johName'].fullName, johRole: formData.value.JOH[joh]['johRole'].appointment, period: formData.value.period }
      }
    }
    return {}
  }

  matchDuplicateRecords(validRecords, formData){
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

  postResolvedDuplicates(errorRecords, optionsSelected){
    const resolvedObjects: any[] = []
    errorRecords.forEach((data, index) => {
      if(optionsSelected[index] === true) {
        const recordData = data.postedRecord
        if(data.errorCode !== 'VALID'){
          recordData.replaceDuplicate = true;
        }
        resolvedObjects.push(data.postedRecord);
      }
    });

    const postBody = {
      recordedByIdamId: this.uInfoSvc.getIdamId(),
      recordedByName: this.uInfoSvc.getUserName(),
      recordedSittingRecords: resolvedObjects
    };

    if(resolvedObjects.length === 0){
      return of('No_Records')
    }

    return this.sittingRecordsSvc.postNewSittingRecord(postBody, this.srWorkFlow.getHmctsServiceCode());

  }

}
