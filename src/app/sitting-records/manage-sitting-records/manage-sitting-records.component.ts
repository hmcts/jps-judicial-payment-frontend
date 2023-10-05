import {Component, OnInit} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { RecorderWorkflowService } from '../../_workflows/recorder-workflow.service';
import { ManageSittingRecord } from '../../_validators/sittingRecordsFormValidator/sitting-records-form-validator';
import { debounceTime, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { LocationService } from '../../_services/location-service/location.service'
import { VenueModel } from '../../_models/venue.model';
import { AutoCompleteValidator } from '../../_validators/autoCompleteValidator/auto-complete-validator'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
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
  private unsubscribe$ = new Subject<void>()
  delay = 300;
  typeaheadResultsFound = true;
  tribunalServices = environment.tribunalServices;
  filteredVenues;
  showPreviousButton = true;
  
  submitForm(){
    this.recorderWorkFlowService.setFormData(this.manageRecords)
    this.recorderWorkFlowService.setVenueData(this.venues)
    this.recorderWorkFlowService.setManageVisited()

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    
    void this.router.navigate(['sittingRecords','view'])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.manageRecords?.controls;
  }

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private recorderWorkFlowService: RecorderWorkflowService,
    private locationService : LocationService,
    private cookies: CookieService,
  ){
    this.manageRecords = this.formBuilder.group(
      {
        tribunalService: [null, Validators.required],
        venue: [null, [Validators.required, AutoCompleteValidator.requireSelection]],
        dateSelected: formBuilder.group({
          dateDay: [null, [Validators.required,]],
          dateMonth: [null, [Validators.required,]],
          dateYear: [null, [Validators.required,]],
        },{
          validators: [
            ManageSittingRecord.validateDateFormat
          ]
        })
      }
    );

  }

  private _filter(value: string): object[] {
    if (typeof value !== 'string' || !value || value.length < this.minSearchCharacters) {
      return [];
    }
    this.typeaheadResultsFound = true;
    const filterValue = value.toLowerCase();
    const filteredValues = this.venues.filter(venue => venue['site_name'].toLowerCase().includes(filterValue));
    if (filteredValues.length === 0) {
      this.typeaheadResultsFound = false;
    }

    return filteredValues;
  }

  createEventListeners(){

    if(this.manageRecords.controls['venue'].value === null){
      this.manageRecords.controls['venue'].disable();
    }
    
    this.manageRecords.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      if(this.manageRecords.controls['tribunalService'].value !== "" && this.manageRecords.controls['venue'].disabled){
        this.manageRecords.controls['venue'].enable();
      }

    })

    this.manageRecords.controls['tribunalService'].valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      if(this.manageRecords.controls['venue'].value !== null){
        this.manageRecords.controls['venue'].reset();
      }else{
        this.getVenues(this.manageRecords.controls['tribunalService'].value['hmctsServiceCode']);
      }
    });

    this.filteredVenues = this.manageRecords.controls['venue'].valueChanges.pipe(takeUntil(this.unsubscribe$))
      .pipe(
        startWith(''),
        debounceTime(this.delay), 
        tap((term) => this.searchTerm = term),
        map(value => this._filter(value))
      );
  }

  ngOnInit(): void {
    if(this.recorderWorkFlowService.getFormData()){
      this.manageRecords = this.recorderWorkFlowService.getFormData();
    }

    if(this.recorderWorkFlowService.getVenueData()){
      this.venues = this.recorderWorkFlowService.getVenueData();
    }

    this.createEventListeners();

    const userRole = this.cookies.get('__userrole__');
    if (userRole.indexOf('jps-recorder') != -1)
      this.showPreviousButton = false;
      
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

  public getVenues(serviceCode: string) {
    this.locationService.getAllVenues(serviceCode).subscribe((locations) => {
      this.venues = locations['court_venues'];
    });
  }

  goBack(){
    void this.router.navigate(['sittingRecords','home'])
  }

}

