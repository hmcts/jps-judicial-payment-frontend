import { FormGroup, Validators } from '@angular/forms';

// create your class that extends the angular validator class
export class JohDateValidator extends Validators {

  static validateJohDate(control: FormGroup) {
    const { flagDay, flagMonth, flagYear } = control.controls
    if (!flagDay.dirty || !flagMonth.dirty || !flagYear.dirty) { return null; }
    if (flagDay.touched && (flagDay.value == '' || Number(flagDay.value) > 31)) {
      return { 'date_invalid': true }
    }
    if (flagMonth.touched && (flagMonth.value == '' || Number(flagMonth.value) > 12)) {
      return { 'date_invalid': true }
    }
    if (flagYear.touched && (flagYear.value == '' || flagYear.value.length != 4)) {
      return { 'date_invalid': true }
    }
    if (flagDay.value && flagMonth.value && (flagYear.value && flagYear.value.length == 4)) {
      const dateObj = new Date(`${flagMonth.value}-${flagDay.value}-${flagYear.value}`.replace(/-/g, "/"))
      const supportedDate = new Date('12/11/2021')
      if (dateObj < supportedDate) {
        return { 'date_out_of_support': true }
      }
    }
    return null
  }

}