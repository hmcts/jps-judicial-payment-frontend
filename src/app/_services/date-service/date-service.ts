import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDateFromForm(dateObj: dateObj): string {
    const {dateDay, dateMonth, dateYear} = dateObj;
    return `${dateYear}-${dateMonth}-${dateDay}`
  }

  getPeriod(am: string, pm: string): string {
    const amBool = am === 'true' ? true : false
    const pmBool = pm === 'true' ? true : false
    if(amBool && pmBool){ return "Full Day" }
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
