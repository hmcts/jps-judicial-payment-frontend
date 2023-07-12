import { FormGroup, Validators } from '@angular/forms';

// create your class that extends the angular validator class
export class ManageSittingRecord extends Validators {

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

}