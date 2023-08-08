import {Component, OnInit} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../_validators/sitting-records-form-validator';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { LocationService } from '../../_services/location-service/location.service'
import { VenueModel } from '../../_models/venue.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { environment } from '../../environments/environment'
import { debounceTime, map, startWith, tap } from 'rxjs';
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
  delay = 300;
  typeaheadResultsFound = true;
  tribunalServices = environment.tribunalServices;
  filteredVenues;
  
  submitForm(){
    this.srWorkFlow.setFormData(this.manageRecords)
    this.srWorkFlow.setManageVisited()
    void this.router.navigate(['sittingRecords','view'])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.manageRecords?.controls;
  }

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private srWorkFlow: SittingRecordWorkflowService,
    private locationService : LocationService
  ){
    this.manageRecords = this.formBuilder.group(
      {
        tribunalService: ['', Validators.required],
        venue: ['', [Validators.required, CustomValidators.requireVenueMatch]],
        dateSelected: formBuilder.group({
          dateDay: ['', [Validators.required,]],
          dateMonth: ['', [Validators.required,]],
          dateYear: ['', [Validators.required,]],
        },{
          validators: [
            CustomValidators.validateDateFormat
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
      }else{
        this.getVenues(this.manageRecords.controls['tribunalService'].value['hmctsServiceCode']);
      }
    });

    this.filteredVenues = this.manageRecords.controls['venue'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(this.delay), 
        tap((term) => this.searchTerm = term),
        map(value => this._filter(value))
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


  ngOnInit(): void {
    if(this.srWorkFlow.getFormData()){
      this.manageRecords = this.srWorkFlow.getFormData();
    }
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

}

