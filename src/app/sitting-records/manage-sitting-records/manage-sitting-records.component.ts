import { Component, OnInit} from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../_validators/sitting-records-form-validator';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { VenueService } from '../../_services/venue-service/venue.service'

@Component({
  selector: 'app-manage-sitting-records',
  templateUrl: './manage-sitting-records.component.html',
  styleUrls: ['./manage-sitting-records.component.scss']
})
export class ManageSittingRecordsComponent implements OnInit {

  manageRecords!: FormGroup;
  
  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private srWorkFlow: SittingRecordWorkflowService,
    private venueService : VenueService
  ){
    this.manageRecords = this.formBuilder.group(
      {
        tribunalService: new FormControl('', Validators.required),
        venue: ['', [Validators.required, CustomValidators.requireVenueMatch]],
        dateSelected: this.formBuilder.group({
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
      console.log(this.manageRecords)
      if(this.manageRecords.controls['venue'].value !== ""){
        this.manageRecords.controls['venue'].reset();
      }
    });

  }

  ngOnInit(): void {
    if(this.srWorkFlow.getFormData()){
      this.manageRecords = this.srWorkFlow.getFormData();
    }

    //this.venuesSearch();
  }

  submitForm(){
    this.srWorkFlow.setFormData(this.manageRecords)
    this.srWorkFlow.setManageVisited()
    //this.venueValueChange.unsubscribe()
    void this.router.navigate(['sittingRecords','view'])
  }

  /*get f(): { [key: string]: AbstractControl } {
    return this.manageRecords?.controls;
  }*/



  /*public showVenue(value) {
    if(value) { 
      return value.site_name; 
    }
    return ""
  }*/

  /*public optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.manageRecords.controls['venue'].patchValue(event.option.value, {emitEvent: false, onlySelf: true});
  }*/

  /*public venuesSearch(): void {
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
  }*/
}

