import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { debounceTime, filter, mergeMap, tap } from 'rxjs/operators';
import { VenueModel } from 'src/app/_models/venue.model';
import { VenueService } from '../../../_services/venue-service/venue.service'

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit{
  venues: VenueModel[] = [];
  readonly minSearchCharacters = 3;
  public searchTerm = '';
  delay = 500;
  refDataFound = true;
  venueValueChange: any;
 
  constructor(
    private venueService : VenueService,
    public parentFormGroup: FormGroupDirective ) { }

  ngOnInit() {
    this.venuesSearch();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.parentFormGroup?.control.controls;
  }

  public optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.parentFormGroup?.control.controls['venue'].patchValue(event.option.value, {emitEvent: false, onlySelf: true});
  }

  public showVenue(value) {
    if(value) { 
      return value.site_name; 
    }
    return ""
  }

  public venuesSearch(): void {
    this.venueValueChange = this.parentFormGroup?.control.controls['venue'].valueChanges
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

  ngOnDestroy() {
    this.venueValueChange.unsubscribe();
  }
}
