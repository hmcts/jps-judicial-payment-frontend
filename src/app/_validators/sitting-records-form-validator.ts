import { AbstractControl, FormGroup, Validators } from '@angular/forms';

// setup simple regex for white listed characters
const numbersOnly = new RegExp('^[0-9]+$');


// create your class that extends the angular validator class
export class CustomValidators extends Validators {

  static validateDateFormat(control: FormGroup) {
    if(control){
        const { dateDay, dateMonth, dateYear } = control.controls

        if(dateDay.touched && (dateDay.value == '')){
            return { 'date_invalid' : true}
        }
        if(dateMonth.touched && (dateMonth.value == '')){
            return { 'date_invalid' : true}
        }
        if(dateYear.touched && (dateYear.value == '' || dateYear.value.length != 4)){
            return { 'date_invalid' : true}
        }

        if(dateDay.value && dateMonth.value && (dateYear.value && dateYear.value.length == 4)){
            const dateObj = new Date(`${dateMonth.value}-${dateDay.value}-${dateYear.value}`)
            const todaysDate = new Date()
            const supportedDate = new Date('12-11-2021')

            if(dateObj > todaysDate){
                return { 'date_after_today': true }
            }

            if(dateObj < supportedDate){
                return { 'date_out_of_support': true }
            }

            if(CustomValidators.validateDay(dateDay) && CustomValidators.validateMonth(dateMonth) && CustomValidators.validateYear(dateYear)){
                return null
            }
        } 



    }
    return null
  }

  static validateDay(control: AbstractControl) {
    if (control.value && control.value.length > 0 && control.dirty) {
      const matches = numbersOnly.test(control.value);
      if(Number(control.value) > 31){
        return { 'out_of_date_range': true }
      }
      if(!matches){
        return { 'contains_non_int': true }
      }
      return true
    } else {
      return true;
    }
  }

  static validateMonth(control: AbstractControl) {
    if (control.value && control.value.length > 0 && control.dirty) {
      const matches = numbersOnly.test(control.value);
      if(Number(control.value) > 12){
        return { 'out_of_month_range': true }
      }
      if(!matches){
        return { 'contains_non_int': true }
      }
      return true;
    } else {
      return true;
    }
  }

  static validateYear(control: AbstractControl) {
    if (control.value && control.value.length > 0 && control.dirty) {
      const matches = numbersOnly.test(control.value);
      const today = new Date()
      if(control.value > today.getFullYear()){
        return { 'year_after_current' : true }
      }
      if(!matches){
        return { 'contains_non_int' : true}
      }
      return true;
    } else {
      return true;
    }
  }

}