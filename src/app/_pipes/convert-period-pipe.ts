import { Pipe, PipeTransform } from '@angular/core';
/**
 *
 * takes in am and pm booleans and converts to Human readble strings
 *
 * @export - text result of period booleans
 * @class ConvertToStringPeriodPipe
 * @implements {PipeTransform}
 */
@Pipe({
    name: 'convertToStringPeriod'
})
export class ConvertToStringPeriodPipe implements PipeTransform {
    transform(am: boolean, pm: boolean): string {
        if(am && pm){ return "Full Day" }
        if(am){ return "Morning" }
        if(pm){ return "Afternoon" }
        return ""
    }
}

/**
 *
 * takes in period selected from addSittingRecord page 
 *
 * @export - text result of period booleans
 * @class ConvertToStringPeriodPipe
 * @implements {PipeTransform}
 */
@Pipe({
    name: 'convertAddPeriodToString'
})
export class ConvertAddPeriodPipe implements PipeTransform {
    transform(period: string): string {
        switch (period) {
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
