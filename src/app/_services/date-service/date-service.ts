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

  getPeriod(am: boolean, pm: boolean): string {
    if(am && pm){ return "Full day" }
    if(am){ return "Morning" }
    if(pm){ return "Afternoon" }
    return ""
  }

  createDateObjFromFormData(dateObj){
    const {dateDay, dateMonth, dateYear} = dateObj;
    return new Date(Date.UTC(dateYear, dateMonth - 1, dateDay));
  }

}

export class dateObj{
  dateDay: string | undefined;
  dateMonth: string | undefined;
  dateYear: string | undefined;
}
