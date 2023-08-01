import { Injectable } from '@angular/core';
import { DateService } from '../_services/date-service/date-service'

@Injectable({
  providedIn: 'root'
})
export class DuplicateRecordWorkflowService {

  recordErrors;

  constructor(
    private dateSvc: DateService,
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

  matchDuplicateRecords(personalCode, formData){
    for(const joh in formData.value.JOH){
      if(formData.value.JOH[joh]['johName'].personalCode === personalCode){
        return { johName: formData.value.JOH[joh]['johName'].fullName, johRole: formData.value.JOH[joh]['johRole'].appointment, period: formData.value.period }
      }
    }
    return {}
  }

}
