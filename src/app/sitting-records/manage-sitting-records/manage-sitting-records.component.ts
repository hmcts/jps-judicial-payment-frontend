import { Component, EventEmitter, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, mergeMap, tap } from 'rxjs/operators';
import { CustomValidators } from '../../_validators/sitting-records-form-validator';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { VenueService } from 'src/app/_services/venue.service';
import { VenueModel } from 'src/app/_models/venue.model';

@Component({
  selector: 'app-manage-sitting-records',
  templateUrl: './manage-sitting-records.component.html',
  styleUrls: ['./manage-sitting-records.component.scss']
})
export class ManageSittingRecordsComponent implements OnInit {
  manageRecords: FormGroup;
  venues: VenueModel[] = [];
  readonly minSearchCharacters = 3;
  term: string = '';
  delay: number = 500;
  pSelectedVenues: any[] = [];
  venueSelected = new EventEmitter<VenueModel>();
  //venueInputChanged: EventEmitter<string> = new EventEmitter<string>();
  searchVenueChanged: EventEmitter<void> = new EventEmitter<void>();

  submitForm(){
    this.srWorkFlow.setFormData(this.manageRecords)
    this.srWorkFlow.setManageVisited()
    this.router.navigate(['sittingRecords','view'])
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
        venue: ['', [Validators.required,]],
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
      }
    });

  }

  ngOnInit(): void {
    if(this.srWorkFlow.getFormData()){
      this.manageRecords = this.srWorkFlow.getFormData();
    }

    this.venuesSearch();
  }

  public get selectedVenues(): any[] {
    return this.pSelectedVenues;
  }

  public onSelectionChange(venue: VenueModel): void {
    this.manageRecords.controls['venue'].patchValue('');
    this.venueSelected.emit(venue);
  }

  public venuesSearch(): void {
    this.manageRecords.controls['venue'].valueChanges
      .pipe(
        //tap((term) => this.venueInputChanged.next(term)),
        //tap(() => this.venues = []),
        filter(searchTerm => searchTerm.length >= this.minSearchCharacters),
        //debounceTime(this.delay),
        mergeMap(value => this.getVenues(value)),
        tap(val => console.log(val)),
        //map((venues) => this.removeSelectedVenues(venues))
      ).subscribe(venues => this.venues = venues);
  }

  public onInputVenue(): void {
    this.searchVenueChanged.emit();
  }

  public getVenues(searchTerm: string): Observable<VenueModel[]> {
    return this.venueService.getAllVenues(searchTerm);
  }

  private removeSelectedVenues(venues: VenueModel[]): VenueModel[] {
    return venues.filter(
      venue => !this.selectedVenues.map(selectedVenue => selectedVenue.epimms_id).includes(venue.epimms_id) && venue.site_name);
  
  }
}

