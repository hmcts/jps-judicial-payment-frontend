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
    const amBool = am === 'AM' ? true : false
    const pmBool = pm === 'PM' ? true : false
    if(amBool && pmBool){ return "Full Day" }
    if(amBool){ return "Morning" }
    if(pmBool){ return "Afternoon" }
    return ""
  }

  createDateObjFromFormData(dateObj){
    const {dateDay, dateMonth, dateYear} = dateObj;
    const dateString = `${dateMonth}/${dateDay}/${dateYear}`
    return new Date(dateString)
  }

  convertPeriod(period: string): string {
    switch(period){
      case 'AM':
        return "Morning"
      case 'PM':
        return "Afternoon"
      case 'FULL_DAY':
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
