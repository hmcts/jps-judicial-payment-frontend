import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDateFromForm(dateObj: dateObj): string {
    const {dateDay, dateMonth, dateYear} = dateObj;
    return `${dateDay}/${dateMonth}/${dateYear}`
  }

  convertPeriod(period: string): string {
    switch(period){
      case 'am':
        return "Morning"
      case 'pm':
        return "Afternoon"
      case 'both':
        return "Full Day"
      default:
        return ''
    }
  }

}
export class dateObj{
  dateDay: string | undefined;
  dateMonth: string | undefined;
  dateYear: string | undefined;
}
