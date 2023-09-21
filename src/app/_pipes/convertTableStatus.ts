import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizeFirstLetterForStatus'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';  
        value = value.toLowerCase();  
        return value.charAt(0).toUpperCase() + value.slice(1);  
    }

}