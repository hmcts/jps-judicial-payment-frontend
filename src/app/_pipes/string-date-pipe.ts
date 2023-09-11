import { Pipe, PipeTransform } from '@angular/core';
/**
 *
 * takes in a string of format yyyy-mm-dd and converts to long string format
 *
 * @export - formatted date inf format 'date longMonth longYear
 * @class StringFromDatePipe
 * @implements {PipeTransform}
 */
@Pipe({
    name: 'stringFromDate'
})
export class StringFromDatePipe implements PipeTransform {
    transform(dateString: string): string {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return formattedDate;
    }
}
