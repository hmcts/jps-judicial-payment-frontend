import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit, OnDestroy{

  @Input() venues;

  readonly minSearchCharacters = 3;
  delay = 500;
  filteredVenues;
  typeaheadResultsFound = true;
  public searchTerm = ''
  private destroy$ = new Subject<void>();


  constructor(
    public parentFormGroup: FormGroupDirective ) { }

  ngOnInit() {
    this.filteredVenues = this.parentFormGroup.control.controls['venue'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .pipe(
        startWith(''),
        debounceTime(this.delay), 
        tap((term) => this.searchTerm = term),
        map(value => this._filter(value))
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _filter(value: string): object[] {
    if (typeof value !== 'string' || !value || value.length < this.minSearchCharacters) {
      return [];
    }
    this.typeaheadResultsFound = true;
    const filterValue = value.toLowerCase();
    const filteredValues = this.venues.filter(venue => venue['court_name'].toLowerCase().includes(filterValue));
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
      return value.court_name; 
    }
    return ""
  }

  get f(): { [key: string]: AbstractControl } {
    return this.parentFormGroup?.control.controls;
  }

}
