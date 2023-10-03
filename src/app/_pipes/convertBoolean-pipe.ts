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
    name: 'convertBooleanToYN'
})
export class ConvertBooleanPipe implements PipeTransform {
    transform(boolean: string): string {
        switch (boolean) {
            case 'true':
                return "Yes"
            case 'false':
                return "No"
            default:
                return ''
        }
    }
}
