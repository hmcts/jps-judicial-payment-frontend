import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDateFromForm(dateObj: dateObj): string {
    const {dateDay, dateMonth, dateYear} = dateObj;
    return `${dateDay}/${dateMonth}/${dateYear}`
  }

  createDateObjFromFormData(dateObj){
    const {dateDay, dateMonth, dateYear} = dateObj;
    const dateString = `${dateMonth}/${dateDay}/${dateYear}`
    return new Date(dateString)
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
