import {Component, OnInit} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageSittingRecord } from '../../_validators/sittingRecordsFormValidator/sitting-records-form-validator';
import { Observable } from 'rxjs';
import { debounceTime, filter, mergeMap, tap } from 'rxjs/operators';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { VenueService } from '../../_services/venue-service/venue.service'
import { VenueModel } from '../../_models/venue.model';
import { AutoCompleteValidator } from '../../_validators/autoCompleteValidator/auto-complete-validator'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-manage-sitting-records',
  templateUrl: './manage-sitting-records.component.html',
  styleUrls: ['./manage-sitting-records.component.scss']
})
export class ManageSittingRecordsComponent implements OnInit {
  manageRecords: FormGroup;
  venues: VenueModel[] = [];
  readonly minSearchCharacters = 3;
  public searchTerm = '';
  delay = 500;
  refDataFound = true;
  venueValueChange: any;
  
  submitForm(){
    this.srWorkFlow.setFormData(this.manageRecords)
    this.srWorkFlow.setManageVisited()
    this.venueValueChange.unsubscribe()
    void this.router.navigate(['sittingRecords','view'])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.manageRecords?.controls;
  }

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srWorkFlow: SittingRecordWorkflowService,
    private venueService : VenueService
  ){
    this.manageRecords = this.formBuilder.group(
      {
        tribunalService: ['', Validators.required],
        venue: ['', [Validators.required, AutoCompleteValidator.requireSelection]],
        dateSelected: formBuilder.group({
          dateDay: ['', [Validators.required,]],
          dateMonth: ['', [Validators.required,]],
          dateYear: ['', [Validators.required,]],
        },{
          validators: [
            ManageSittingRecord.validateDateFormat
          ]
        })
      }
    );
    this.manageRecords.controls['venue'].disable();
    
    this.manageRecords.valueChanges.subscribe(() => {
      if(this.manageRecords.controls['tribunalService'].value !== "" && this.manageRecords.controls['venue'].disabled){
        this.manageRecords.controls['venue'].enable();
      }

    })

    this.manageRecords.controls['tribunalService'].valueChanges.subscribe(() => {
      if(this.manageRecords.controls['venue'].value !== ""){
        this.manageRecords.controls['venue'].reset();
      }
    });

  }

  ngOnInit(): void {
    if(this.srWorkFlow.getFormData()){
      this.manageRecords = this.srWorkFlow.getFormData();
    }

    this.venuesSearch();
  }

  public showVenue(value) {
    if(value) { 
      return value.site_name; 
    }
    return ""
  }

  public optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.manageRecords.controls['venue'].patchValue(event.option.value, {emitEvent: false, onlySelf: true});
  }

  public venuesSearch(): void {
    this.venueValueChange = this.manageRecords.controls['venue'].valueChanges
      .pipe(
        tap(() => this.venues = []),
        tap(() => this.refDataFound = true),
        tap((term) => this.searchTerm = term),
        filter(term => !!term && term.length >= this.minSearchCharacters),
        debounceTime(this.delay),
        mergeMap(value => this.getVenues(value)),
      ).subscribe(venues => {
        this.venues = venues;
        if (venues.length === 0) {
          this.refDataFound = false;
        }
      });
  }

  public getVenues(searchTerm: string): Observable<VenueModel[]> {
    return this.venueService.getAllVenues(searchTerm);
  }

}

