import { Component, Injectable, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { 
  BehaviorSubject,
  Observable, 
  OperatorFunction, 
  catchError, 
  debounceTime, 
  distinctUntilChanged, 
  map, 
  of, 
  switchMap, 
  tap
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const PARAMS = new HttpParams({
    fromObject: {
      action: 'opensearch',
      format: 'json',
      origin: '*',
    },
  });

@Component({
  selector: 'app-add-sitting-record',
  templateUrl: './add-sitting-record.component.html',
  styleUrls: ['./add-sitting-record.component.scss'],
})
export class AddSittingRecordComponent implements OnInit {

  setJohNameValue(johIndex: number, nameSelected: string) {
    console.log(nameSelected, johIndex)
    this.johFormArray.controls[johIndex].setValue(nameSelected);
  }

  addSittingRecordsFG: FormGroup;

  tribService = "";
  venue = "";
  date = "";

  autoCompleteVis = [false, false, false]

  serachJohNames$ = new BehaviorSubject<string>('')
  johAutocompList$: Observable<string[]> = this.serachJohNames$.pipe(
    debounceTime(400),
    switchMap(searchJohNameText => {
      if(searchJohNameText.length < 2) return ([])
      return this.http
      .get<any[]>('https://en.wikipedia.org/w/api.php', { params: PARAMS.set('search', searchJohNameText) })
			.pipe(map((response) => response[1]));

    })
  );

  getJohName(controlIndex: number) {
    this.serachJohNames$.next(this.johFormArray.controls[controlIndex].value.johName);
  }

  goBack() {
    this.router.navigate(['sittingRecords', 'view'])
  }

  get johFormArray() {
    return <FormArray>this.addSittingRecordsFG.get('JOH');
  }

  submitNewSittingRecord() {

    this.srWorkFlow.formAndPostNewSittingRecord(this.addSittingRecordsFG, () =>{
      this.router.navigate(['sittingRecords', 'addSuccess'])
    })

  }

  addNewJoh() {
    if (this.johFormArray.length != 3) {
      this.johFormArray.push(
        new FormGroup({
          johName: new FormControl(null, [Validators.required]),
          johRole: new FormControl(null, [Validators.required])
        })
      )
    }
  }

  removeJoh(index: number) {
    this.johFormArray.removeAt(index)
  }

  constructor(
    public srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    public router: Router,
    private http: HttpClient
  ) {

    this.addSittingRecordsFG = new FormGroup(
      {
        JOH: new FormArray([
          new FormGroup({
            johName: new FormControl(null, [Validators.required]),
            johRole: new FormControl(null, [Validators.required])
          })
        ]),
        period: new FormControl(null, [Validators.required]),
      }
    );
  }

  ngOnInit() {
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venue = venue;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);
  }

}
