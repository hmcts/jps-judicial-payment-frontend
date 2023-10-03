import { Pipe, PipeTransform } from "@angular/core"

/**
 *
 * takes in boolean selected from manage flags page 
 *
 * @export - text result of flag booleans
 * @class convertBooleanToYN
 * @implements {PipeTransform}
 */
@Pipe({
    name: 'ConvertFlagDateToString'
})
export class ConvertFlagDateToString implements PipeTransform {
    transform(flagDate: FlagDate): string {
        const { flagDay, flagMonth, flagYear } = flagDate;
        const paddedFlagDay = String(flagDay).padStart(2, '0');
        const paddedFlagMonth = String(flagMonth).padStart(2, '0');
        return `${paddedFlagDay}/${paddedFlagMonth}/${flagYear}`;
    }
}

interface FlagDate {
    flagDay: number;
    flagMonth: number;
    flagYear: number;
}