import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

interface DateValidationError {
  dateLessThan: boolean;
}

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
      const dateObj = new Date(`${dateMonth.value}-${dateDay.value}-${dateYear.value}`.replace(/-/g, "/"))
      const todaysDate = new Date()
      const supportedDate = new Date('12/11/2021')
      if (dateObj > todaysDate) {
        return { 'date_after_today': true }
      }
      if (dateObj < supportedDate) {
        return { 'date_out_of_support': true }
      }
    }
    return null
  }


  static dateLessThan(startDateField: string, endDateField: string): ValidatorFn {
    return (formGroup: AbstractControl): DateValidationError | null => {
      const getDateFromGroup = (fieldName: string): Date | null => {
        const dateFormGroup = formGroup.get(fieldName) as FormGroup;
        if (!dateFormGroup) return null;

        const year = dateFormGroup.get('dateYear')?.value;
        const month = dateFormGroup.get('dateMonth')?.value;
        const day = dateFormGroup.get('dateDay')?.value;

        // Check if the year is a string and its length is 4 characters
        if (typeof year !== 'string' || year.length !== 4 ) {
          return null;
        }

        // Construct a new Date and validate it's within the desired range
        const date = new Date(+year, month - 1, day);
        if (!this.isValidDate(date)) {
          return null;
        }

        return date;
      };

      const startDate = getDateFromGroup(startDateField);
      const endDate = getDateFromGroup(endDateField);

      // Validator should exit if either date is not valid yet
      if (!startDate || !endDate) return null;

      // Check if the startDate is before the endDate
      if (startDate > endDate) {
        return { dateLessThan: true };
      }

      return null;
    };
  }

  // Adjusted helper method to accept a Date object
  static isValidDate(date: Date): boolean {
    // Check if date is an invalid Date object
    return !isNaN(date.getTime());
  }
}
