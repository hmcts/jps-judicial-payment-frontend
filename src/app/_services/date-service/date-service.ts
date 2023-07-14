import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDateFromForm(dateObj: dateObj){
    const {dateDay, dateMonth, dateYear} = dateObj;
    return `${dateDay}/${dateMonth}/${dateYear}`
  }

}
export class dateObj{
  dateDay: string | undefined;
  dateMonth: string | undefined;
  dateYear: string | undefined;
}
