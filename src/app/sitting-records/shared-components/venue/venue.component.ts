import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { LocationService } from 'src/app/_services/location-service/location.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit{

  @Input() venues;

  readonly minSearchCharacters = 3;
  delay = 500;
  filteredVenues;
  venueValueChange: any;
  typeaheadResultsFound = true;
  public searchTerm = '';

  constructor(
    private locationService : LocationService,
    public parentFormGroup: FormGroupDirective ) { }

  ngOnInit() {
    this.filteredVenues = this.parentFormGroup.control.controls['venue'].valueChanges
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

  public optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.parentFormGroup.control.controls['venue'].patchValue(event.option.value, {emitEvent: false, onlySelf: true});
  }

  public showVenue(value) {
    if(value) { 
      return value.site_name; 
    }
    return ""
  }

  get f(): { [key: string]: AbstractControl } {
    return this.parentFormGroup?.control.controls;
  }

}
