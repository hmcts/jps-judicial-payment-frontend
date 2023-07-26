import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDateFromForm(dateObj: dateObj): string {
    const {dateDay, dateMonth, dateYear} = dateObj;
    return new Date(Number(dateYear), Number(dateMonth)-1, Number(dateDay)).toLocaleDateString('en-GB')
  }

  getPeriod(am: string, pm: string): string {
    const amBool = am === 'AM' ? true : false
    const pmBool = pm === 'PM' ? true : false
    if(amBool && pmBool){ return "Full day" }
    if(amBool){ return "Morning" }
    if(pmBool){ return "Afternoon" }
    return ""
  }

}

export class dateObj{
  dateDay: string | undefined;
  dateMonth: string | undefined;
  dateYear: string | undefined;
}
