import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {


  constructor() { }

  formatDateFromForm(dateObj: any){
    const {dateDay, dateMonth, dateYear} = dateObj;
    return `${dateDay}/${dateMonth}/${dateYear}`
  }

}
