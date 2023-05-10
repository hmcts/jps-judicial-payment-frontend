import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { VenueModel } from '../_models/venue.model';

// create your class that extends the angular validator class
export class CustomValidators extends Validators {

  static validateDateFormat(control: FormGroup) {
    const { dateDay, dateMonth, dateYear } = control.controls
    if (!dateDay.dirty || !dateMonth.dirty || !dateYear.dirty) { return null; }
    if (dateDay.touched && (dateDay.value == '' || Number(dateDay.value) > 31)) {
      return { 'date_invalid': true }
    }
    if (dateMonth.touched && (dateMonth.value == '' || Number(dateMonth.value) > 12)) {
      return { 'date_invalid': true }
    }
    if (dateYear.touched && (dateYear.value == '' || dateYear.value.length != 4)) {
      return { 'date_invalid': true }
    }
    if (dateDay.value && dateMonth.value && (dateYear.value && dateYear.value.length == 4)) {
      const dateObj = new Date(`${dateMonth.value}-${dateDay.value}-${dateYear.value}`)
      const todaysDate = new Date()
      const supportedDate = new Date('12-11-2021')
      if (dateObj > todaysDate) {
        return { 'date_after_today': true }
      }
      if (dateObj < supportedDate) {
        return { 'date_out_of_support': true }
      }
    }
    return null
  }

  static RequireVenueMatch(control: AbstractControl, venues: VenueModel[]) {
    const inputValue: any = control.value;
    /*if (!!inputValue && inputValue.length >= 3 && typeof inputValue === 'string') {
      return { 'value_not_selected': true };
    }*/

    /*let pickedOrNot = venues.filter(val => val.site_name === inputValue);

    if (pickedOrNot.length > 0) {
      return null;
    }
    else {
      return { 'value_not_selected': true };
    }*/
  }

  
  


}