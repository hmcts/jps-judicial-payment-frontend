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

}
