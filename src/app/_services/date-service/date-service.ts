import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDateFromForm(dateObj: dateObj): string {
    const {dateDay, dateMonth, dateYear} = dateObj;
    return new Date(Number(dateYear), Number(dateMonth)-1, Number(dateDay)).toLocaleDateString('en-GB')
  }

  formatDateForPost(dateObj: dateObj): string{
    const {dateDay, dateMonth, dateYear} = dateObj;
    const date = new Date(Number(dateYear), Number(dateMonth)-1, Number(dateDay));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getPeriod(am: string, pm: string): string {
    const amBool = am === 'AM' ? true : false
    const pmBool = pm === 'PM' ? true : false
    if(amBool && pmBool){ return "Full day" }
    if(amBool){ return "Morning" }
    if(pmBool){ return "Afternoon" }
    return ""
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
